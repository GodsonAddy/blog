require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const CookieParser = require("cookie-parser");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(CookieParser());
mongoose.promise = global.Promise;

const userRoute = require("./config/signup");

const bloggerRoute = require("./config/blogPosts");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("success");
  })
  .catch((res) => {
    console.error("error");
  });
mongoose.set("debug", true);

app.use("/api/auth/users", userRoute);

app.use("/api/auth/blog", bloggerRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("clients/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is listening to port", port);
});
