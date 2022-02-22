require("dotenv").config();
const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");


// Get all users
router.get("/api/auth/users", (req, res) => res.json(Users));

// get a single user
router.get("/users", auth, async (req, res) => {
    const found = await Users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json(Users.findById(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
});


// create user
router.post("/api/auth/register", async (req, res) => {
    
    const {email, password, first_name, last_name} = req.body;

    if(!email || !password || !first_name || !last_name) {
        return res.status(400).json({msg: "Please fill in everything"})
    };

        
    try{
            
        const user = await Users.findOne({email});
        if(user) return res.status(400).json({msg: "Blogger already exists"});
            
        const saltRounds = 10;
        const encrypted = bcrypt.hash(password, saltRounds);
            
        const newUser = new Users({
            id: uuid.v4(),
            email,
            password: encrypted,
            first_name,
            last_name
        });

        const addedUser = await newUser.save();
        if(!addedUser) return res.status(400).json({msg: "Can't add new blogger"});

        const jwtToken = jwt.sign({id: addedUser._id}, process.env.JWT_SECRET,{expiresIn: 3600});
                        
        res.status(200).json({
            jwtToken,
            user: {
                id: addedUser.id,
                name: addedUser.name,
                email: addedUser.email
            }
        })
            
    }catch(err) {
        console.log(err)
    }
    
})

// update user
router.put("/api/auth/users:id", async (req,res) => {
    const found = await Users.some(user => user.id === parseInt(req.params.id));

    if(found) {
        const updUser = req.body;
        Users.findById(user => {  
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

// login

router.post("/api/auth/login", async (req,res) => {
    const user = await Users.findOne(user => user.email === req.body.email);

    if(user) {
        const passwordCorrect = bcrypt.compare(req.body.password, user.password)
        if(!user && !passwordCorrect){
            return res.status(400).json({msg: "Invalid email or password"})
        }
        res.status(200).send({email: user.email})
    }
})

// delete a user

router.delete("/api/auth/users:id", (req, res) => {
    const found = Users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: "User deleted", 
            users: Users.findById(user => user.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
});


module.exports = router;