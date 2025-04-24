const express = require("express");
const profileRouter = express.Router();
const {userAuth } = require("../middlewares/auth");

//profile API
profileRouter.get("/profile",userAuth,async (req,res)=>{

    try{
        const user = req.user;
        res.send(user);

    }catch(err){
        res.send("something went wrong in profile: " + err.message);
    }
})

module.exports = profileRouter;
