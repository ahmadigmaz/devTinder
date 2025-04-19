const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const {connectDb} = require("./config/database");
const User = require("./models/user");

app.use(express.json());



app.post("/signup", async (req,res)=>{

//creating a new instance of the user model
    const user  = new User(req.body);

    try{
        await user.save();
        res.send("data is successfully added into the database");
    }catch(err){
        res.status(500).send("Something went Wrong" + err.message);
    }
})
//get the user from the database with the help of the emailId
app.get("/user",async (req,res)=>{
    const email = req.body.emailId;
    try{
        const user = await User.find({emailId:email})
        if(user.length === 0){
            res.status(404).send("user not found");
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(500).send(err + "something went wrong");
    }
})

//if there is multiple users with the same entries but we want to fetch one from them

app.get("/user1",async (req,res)=>{
    const email = req.body.emailId;

    try{
        const user = await User.findOne({emailId:email});
        if(!user){
            res.send("user not found")
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(404).send("user not found");
    }
   



})

//get all the users from the database 
app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(404).send("something went wrong");
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