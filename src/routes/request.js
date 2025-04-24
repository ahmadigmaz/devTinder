const express = require("express");
const requestRouter = express.Router();
const {userAuth } = require("../middlewares/auth");

//API connection request
requestRouter.post("/connectionRequest",userAuth,async (req,res)=>{
    try{
        const user =  req.user
        res.send(user);
    }catch(err){
        res.send("something went wrong: " + err.message);
    }
})

module.exports = requestRouter;