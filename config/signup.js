require("dotenv").config();
const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const SendEmail = require("./sendmail");
const ResetToken = require("../models/token");
const { OAuth2Client, UserRefreshClient } = require("google-auth-library");
const crypto = require("crypto");
const ResetPassword = require("../middleware/ResetPassword");

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRETS;

const client = new OAuth2Client(clientId, clientSecret, "postmessage");

// Handle Errors

const HandleErrors = (err) => {
  let errors = { email: "", password: "", first_name: "", last_name: "" };

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create user
router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name, color } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ msg: "Please fill in everything" });
  }

  try {
    const user = await Users.findOne({ email });
    if (user)
      return res
        .status(400)
        .send({ msg: "Blogger already exists!. Please Login" });

    let lowerFname = first_name.toLowerCase();
    let lowerLname = last_name.toLowerCase();

    const newUser = new Users({
      email,
      password,
      first_name,
      last_name,
      name: first_name + " " + last_name,
      initials: `${first_name.split(" ")[0][0]}${last_name.split(" ")[0][0]}`,
      moniker: "@" + lowerFname + lowerLname,
      color,
    });

    const addedUser = await newUser.save();
    if (!addedUser)
      return res.status(400).json({ msg: "Can't add new blogger" });

    const jwtToken = jwt.sign({ id: addedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res
      .header("Authorization", jwtToken)
      .status(200)
      .json({
        jwtToken,

        _id: addedUser._id,
        name: addedUser.first_name + " " + addedUser.last_name,
        email: addedUser.email,
        initials: `${addedUser.first_name.split(" ")[0][0]}${
          addedUser.last_name.split(" ")[0][0]
        }`,
        moniker: "@" + lowerFname + lowerLname,
      });
  } catch (err) {
    let errors = HandleErrors(err);

    return res.status(400).json({
      msg:
        errors.email ||
        errors.password ||
        errors.first_name ||
        errors.last_name,
    });
  }
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Invalid Credentials" });

  try {
    const user = await Users.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "Email doesn't exist" });

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect)
      return res.status(400).json({ msg: "Invalid Password" });

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    let lowerFname = user.first_name.toLowerCase();
    let lowerLname = user.last_name.toLowerCase();
    res
      .header("Authorization", jwtToken)
      .status(200)
      .send({
        success: true,
        jwtToken,
        _id: user._id,
        name: user.name,
        email: user.email,
        initials: `${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}`,
        moniker: "@" + lowerFname + lowerLname,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Login Error", error });
  }
});

//Forgot Password

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ msg: "Invalid Credentials" });
    const user = await Users.findOne({ email: email });
    if (!user) return res.status(400).send({ msg: "Email doesn't exist" });

    let token = await ResetToken.findOne({ userId: user._id });
    if (token) {
      return res.status(400).json({
        msg: "Password reset link has been sent to your email address. You have a 15mins window to reset your password",
      });
    }
    const hex = await crypto.randomBytes(32).toString("hex");
    const jwtToken = new ResetToken({ userId: user._id, token: hex });
    await jwtToken.save();

    const newpasswordlink = `http://localhost:3000/reset-password?id=${user._id}&token=${hex}`;
    await SendEmail(user.email, "Reset Password", newpasswordlink);

    res
      .status(200)
      .send({ msg: "Password reset link has been sent to your email address" });
  } catch (error) {
    return res.status(500).send({ msg: "Password Reset Error", error });
  }
});

// Get Reset Password

router.get("/reset-password", ResetPassword, async (req, res) => {
  res.status(200).json({ success: true });
});

// Post Reset Password

router.post("/reset-password", ResetPassword, async (req, res, err) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: "Please fill in everything" });
  }
  try {
    const user = await Users.findById(req.user._id);
    if (!user) {
      return res.status(400).send({ msg: "Invalid ID" });
    }

    const samepassword = await user.comparePassword(password);

    if (samepassword) {
      return res
        .status(400)
        .send({ msg: "New password must be different from that of the old" });
    }

    user.password = password;
    await user.save();

    await ResetToken.findOneAndDelete({ userId: user._id });

    res.status(200).send({ msg: "Password reset successfully" });
  } catch (error) {
    let errors = HandleErrors(error);
    return res.status(400).json({
      msg: errors.password,
    });
  }
});

// Google Login

router.post("/googlelogin", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });

  const { email_verified, email, name, given_name, family_name, picture } =
    ticket.getPayload();

  if (email_verified) {
    Users.findOne({ email }).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          msg: "There's an error ",
        });
      } else {
        if (user) {
          const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "12h",
          });

          let fname = user.first_name;
          let lname = user.last_name;

          let lowerFname = fname.toLowerCase();
          let lowerLname = lname.toLowerCase();

          res
            .header("Authorization", jwtToken)
            .status(200)
            .send({
              success: true,
              jwtToken,
              avatar: picture,
              _id: user._id,
              name: user.name,
              email: user.email,
              initials: `${user.first_name.split(" ")[0][0]}${
                user.last_name.split(" ")[0][0]
              }`,
              moniker: "@" + lowerFname + lowerLname,
            });
        } else {
          let password = email + process.env.JWT_SECRET;
          let Fname = given_name.toLowerCase();
          let Lname = family_name.toLowerCase();
          let newUser = new Users({
            email,
            password,
            first_name: given_name,
            last_name: family_name,
            name,
            avatar: picture,
            initials: `${given_name.split(" ")[0][0]}${
              family_name.split(" ")[0][0]
            }`,
            moniker: "@" + Fname + Lname,
          });
          const addedUser = newUser.save();

          if (!addedUser)
            return res.status(400).json({ msg: "Can't add new blogger" });

          const jwtToken = jwt.sign(
            { id: addedUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "12h",
            }
          );

          let fname = given_name;
          let lname = family_name;

          let lowerFname = fname.toLowerCase();
          let lowerLname = lname.toLowerCase();

          res
            .header("Authorization", jwtToken)
            .status(200)
            .json({
              jwtToken,
              _id: addedUser._id,
              name,
              email,
              initials: `${given_name.split(" ")[0][0]}${
                family_name.split(" ")[0][0]
              }`,
              moniker: "@" + lowerFname + lowerLname,
              avatar: picture,
            });
        }
      }
    });
  }
});

router.post("googlelogin/refresh-token", async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken
  );
  const { credentials } = await user.refreshAccessToken();
  res.json(credentials);
});

// get a single user
router.get("/credential", auth, async (req, res) => {
  try {
    const user = await Users.findById({ _id: req.user.id });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ msg: `No user with id` });
  }
});

// update user
router.put("/api/auth/users:id", auth, async (req, res) => {
  const found = await Users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updUser = req.body;
    Users.findById((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.email = updUser.email ? updUser.email : user.name;
        user.password = updUser.password ? updUser.password : user.password;

        res.json({ msg: "User updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

// delete a user

router.delete("/api/auth/users:id", auth, (req, res) => {
  const found = Users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "User deleted",
      users: Users.findById((user) => user.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

// get 3 users
router.get("/limit/3", async (req, res) => {
  try {
    const user = await Users.find().limit(3);
    if (!user) {
      res.status(400).json({ msg: "No user yet" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// get all users
router.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 20;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Users.countDocuments({});
    const user = await Users.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);
    await Users.populate(user, { path: "blogposts", model: "blogs" });
    if (!user) {
      res.status(400).json({ msg: "No user yet" });
    }
    res.status(200).json({
      allusers: user,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// search users
router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const search = new RegExp(q, "i");
    const user = await Users.find({ $or: [{ search }] }).populate({
      path: "blogposts",
      model: "blogs",
    });
    if (!user) {
      res.status(400).json({ msg: "No user yet" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// Get user profile by id
router.get("/:id/:moniker", async (req, res) => {
  const { moniker, id } = req.params;
  const { page } = req.query;

  try {
    if (!moniker || !id) {
      return res.status(400).json({ msg: "Invalid moniker or id" });
    }

    const limit = 20;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Users.countDocuments({});
    const userid = await Users.findById(id)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)
      .populate({
        path: "blogposts",
        model: "blogs",
      });

    if (!userid) {
      return res.status(400).json({ msg: `User ${id} does not exist` });
    }

    res.status(200).json({
      allusers: userid,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
  }
});

//Follow user
router.patch("/followuser/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ msg: "Invalid id" });
    }

    const followuser = await Users.findById(id);
    const updateUser = await Users.findByIdAndUpdate(
      id,
      { followers: followuser.followers + 1 },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
