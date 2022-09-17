const jwt = require("jsonwebtoken");
const Users = require("../models/users");
require("dotenv").config();

async function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Need to get a token. Access denied" });
  }

  try {
    const verifyJWT = jwt.verify(token, process.env.JWT_SECRET);
    //req.user = verifyJWT;
    req.user = await Users.findById(verifyJWT.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ msg: "Access expired. Please login again", error });
  }
}

module.exports = auth;
