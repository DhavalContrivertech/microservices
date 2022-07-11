const express = require("express")
const jwt = require("jsonwebtoken")
const user = require("../user/modal/user")
const dotenv = require("dotenv")

dotenv.config({path : "../.env"})
const autorization = async (req, res , next) => {
    try {

        const token = req.get('Authorization');
        console.log("token is " + token + process.env.SECRET_KEY)
        console.log(process.env.SECRET_KEY)

        const verifyuser = jwt.verify(token , process.env.SECRET_KEY)
        console.log("verifytiken is " )
        console.log(verifyuser)
        const UserId = await user.findById(verifyuser.id);
        console.log("data is " + UserId)
        if (!UserId) {
            throw new Error("user Is Not FOund")
            return
        }

        req.UserId = UserId

        console.log("this is authorization")
        
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({error : "User is not autthorize"})
    }
}

module.exports = autorization