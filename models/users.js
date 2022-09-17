const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isAlpha, isStrongPassword } = require("validator");

const { Schema, model } = mongoose;

const UsersSchema = new Schema(
  {
    blogposts: {
      type: Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
      validate: [isAlpha, "First name should contain only letters"],
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      validate: [isAlpha, "Last name should contain only letters"],
    },
    name: {
      type: String,
    },
    initials: {
      type: String,
    },
    moniker: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      unique: true,
      validate: [
        isStrongPassword,
        "Password must contain a minimum of 8 characters including lowercase, upercase, number and symbol",
      ],

      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    color: {
      type: String,
    },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
  },
  { timestamps: true }
);

UsersSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    name: this.first_name + " " + this.last_name,
    avatar: this.avatar,
    initials: this.initials,
    moniker: this.moniker,
    followers: this.followers,
    following: this.following,
    blogposts: this.blogposts,
    color: this.color,
  };
};

UsersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, saltRounds);
    this.password = hashed;
  }

  next();
});

UsersSchema.pre("save", async function (next) {
  if (this.isModified("color")) {
    let colorCharacters = "0123456789ABCDEF";
    let hashColor = "#";

    for (let i = 0; i < 6; i++) {
      hashColor += colorCharacters[Math.floor(Math.random() * 16)];
    }
    this.color = hashColor;
  }

  next();
});

UsersSchema.methods.comparePassword = async function (password) {
  const data = await bcrypt.compareSync(password, this.password);
  return data;
};

const Users = model("user", UsersSchema);
module.exports = Users;
