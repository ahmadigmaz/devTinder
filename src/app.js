const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const {connectDb} = require("./config/database");
const User = require("./models/user");



app.post("/signup", async (req,res)=>{
    //creating a new instance of the user model
    const user  = new User({
        firstName:"Igmaz",
        lastName:"Ahmad",
        emailId:"igmazahmad@gmail.com",
        password:"Igmaz@123"
    });

    try{
        await user.save();
        res.send("data is successfully added into the database");
    }catch(err){
        res.status(500).send("Something went Wrong" + err.message);
    }
})

connectDb().then(()=>{
    console.log("database is connected");
    
    app.listen(7777,()=>{
        console.log("server is listening on 7777 port");
    });
}).catch(err=>{
    console.log("database connection is not established");
})