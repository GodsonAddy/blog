const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 900 },
});

TokenSchema.pre("save", async function (next) {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.token, saltRounds);
    this.token = hashed;
    next();
  } catch (error) {
    //console.log(error);
    next();
  }
});

TokenSchema.methods.compareToken = async function (token) {
  const data = await bcrypt.compare(token, this.token);
  return data;
};

const ResetToken = model("token", TokenSchema);
module.exports = ResetToken;
