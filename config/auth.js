const jwt = require("jsonwebtoken");
require("dotenv").config();


const config = {
    headers: {
        "Content-type": "application/json"
    }
}

function auth (req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'Need to get a token. Access denied'})
    }


    try {
        const verifyJWT = jwt.verify(token, config.get(process.env.JWT_SECRET));
        req.user = verifyJWT;
        next();
    }
    catch(e) {
        res.status(400).json({msg: 'Wrong token'})
    }

}

module.exports = auth;


