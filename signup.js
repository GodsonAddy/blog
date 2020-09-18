
const express = require("express");
const signupRouter = express.Router();
const uuid = require("uuid");
const users = require('./users');
const bcrypt = require("bcrypt");


// Get all users
signupRouter.get("/", (req, res) => res.json(users));

// get a single user
signupRouter.get("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
});


// create user
signupRouter.post("/", (req, res, next) => {
    try {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (passwordHash) => {
            const newUser = {
                id: uuid.v4(),
                email: req.body.email,
                password: passwordHash,
                status: "active"
            }
        
            if(!newUser.email || !newUser.password) {
                return res.status(400).json({msg: "Please include an email and a password"})
            } 
            users.push(newUser);
            res.json(users);
            //res.redirect("/Home")
        })
    } catch(exception){
        next(exception)
    } 
    
})

// update user
signupRouter.put("/:id", (req,res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if(found) {
        const updUser = req.body;
        users.forEach(user => {  
            if(user.id === parseInt(req.params.id)) {
                user.email = updUser.email ? updUser.email : user.name;
                user.password = updUser.password ? updUser.password : user.password;

                res.json({msg: "User updated", user})
            }
            
        });
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
    
})


// delete a user

signupRouter.delete("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: "User deleted", 
            users: users.filter(user => user.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
});
module.exports = signupRouter;