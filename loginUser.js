const express = require("express");
const loginRouter = express.Router();
const users = require('./users');
const bcrypt = require("bcrypt");

loginRouter.post("/", (req,res) => {
    const user = users.find(user => user.email === req.body.email);

    if(user) {
        const passwordCorrect = bcrypt.compare(req.body.password, user.password)
        if(!user && !passwordCorrect){
            return res.status(400).json({msg: "Invalid username or password"})
        }
        res.status(200).send({email: user.email})
    }
})
module.exports = loginRouter;