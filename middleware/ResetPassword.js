const ResetToken = require("../../server/models/token");
const Users = require("../../server/models/users");
const { isValidObjectId } = require("mongoose");

// Reset Password Middleware

async function ResetPassword(req, res, next) {
  const { id, token } = req.query;

  if (!token || !id)
    return res.status(400).json({ msg: "Invalid token or id" });
  if (!isValidObjectId(id))
    return res.status(400).json({ msg: "Invalid ID request" });
  const user = await Users.findById(id);
  if (!user) {
    return res.status(400).send({ msg: "Invalid ID" });
  }

  const jwtToken = await ResetToken.findOne({
    userId: user._id,
  });
  if (!jwtToken) return res.status(400).send({ msg: "Invalid URL" });
  const valid = await jwtToken.compareToken(token);

  if (!valid) return res.status(400).send({ msg: "URL is invalid" });
  req.user = user;
  next();
}

module.exports = ResetPassword;
