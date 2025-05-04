const express = require("express");
const profileRouter = express.Router();
const {userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const {validation, validateEditProfileData} = require("../utils/validation");
const validator = require("validator");
const user = require("../models/user");
const bcrypt = require("bcrypt");

//profile API
profileRouter.get("/profile/view",userAuth,async (req,res)=>{

    try{
        const user = req.user;
        res.send(user);

    }catch(err){
        res.send("something went wrong in profile: " + err.message);
    }
})

//profile edit
profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
      const isEditAllowed = validateEditProfileData(req);
      if(!isEditAllowed){
        throw new Error("Invalid Edit Request")
      }
      
        const logedInUser = req.user;
        Object.keys(req.body).forEach((key)=>(
        logedInUser[key] = req.body[key]
        ));

        await logedInUser.save();
        res.json({
            message:`${logedInUser.firstName}, your profile updated successfully`,
            data: logedInUser
        })

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

//password edit
profileRouter.patch("/profile/password", userAuth, async (req, res)=>{
    try{
        const newPassword = req.body.newPassword;
 
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("password is not strong");
        }
         const newPasswordHash = await bcrypt.hash(newPassword,10);
         req.user.password = newPasswordHash;
         await req.user.save();
         res.send("password is updated successfully");

    }catch(err){
        res.send("Not able to edit the password "+ err.message);
    }
})


module.exports = profileRouter;
