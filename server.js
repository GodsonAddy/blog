const express = require("express");
const path = require("path")
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use("/api/users", require("./signup"));

// static folder
app.use(express.static(path.join(__dirname, "public")))


const port = 5000;

app.listen(port)