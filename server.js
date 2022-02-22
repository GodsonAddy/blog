require("dotenv").config();
const express = require("express");
const path = require("path")
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
mongoose.promise = global.Promise;

const userRoute = require("./config/signup")


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(res => {console.log("success")})
.catch(res => {console.error("error")})
mongoose.set('debug', true);

app.use(userRoute);

app.get('/', (req, res) => {
    console.log(req)
    res.send("<h1> Hello </h1>")
})
// static folder
app.use(express.static(path.join(__dirname, "public")))


const port = 5000;

app.listen(port, () => {
    console.log("Server is listening to port", port)
});