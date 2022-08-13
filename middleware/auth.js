const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Need to get a token. Access denied" });
  }

  try {
    const verifyJWT = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyJWT;
    next();
  } catch (e) {
    res.status(403).json({ msg: "Access expired. Please login again" });
  }
}

module.exports = auth;
