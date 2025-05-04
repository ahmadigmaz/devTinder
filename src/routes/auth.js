const express = require("express");
const authRouter = express.Router();
const {validation} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");


//signUp API
authRouter.post("/signup", async (req,res)=>{
    
    try{
        //validation of the data
        validation(req);
        //password Encryption
        const {firstName, lastName, emailId ,password,age,about,photoUrl,gender} = req.body;
        const passwordHash = await bcrypt.hash(password,10);

        //creating a new instance of the user model
        const user  = new User({firstName, lastName,emailId,password:passwordHash,age,about,photoUrl,gender});
        await user.save();
        res.send("data is successfully added into the database");
    }catch(err){
        res.status(500).send("Something went Wrong " + err.message);
    }
})

//login API
authRouter.post("/login",async (req,res)=>{

    try{
        const {emailId,password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("email is not valid");
        }

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.passwordValidity(password);
        if(isPasswordValid){
            //JWT token-
            const token = await user.getJWT();

            //add a jwt token into the cookie.
            res.cookie("token",token,{expires: new Date(Date.now()+ 7*3600000)});

            res.json({
                data:user
            }); 
        }else{
            throw new Error("Invalid Credential");
        }

   }catch(err){
     res.status(500).send("Not able to logged in: "  + err.message);
   }
})

//logout API
authRouter.post("/logout", async (req,res)=>{
    try{
        res.cookie("token",null,{expires: new Date(Date.now())});
        res.send("logout successfully");
    }catch(err){
        res.send("not able to logout");
    }
})

module.exports = authRouter;