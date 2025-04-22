const express = require("express");
const app = express();
const {userAuth } = require("./middlewares/auth");
const {connectDb} = require("./config/database");
const User = require("./models/user");
const {validation} = require("./utils/validation");
app.use(express.json());
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const jwt = require("jsonwebtoken");

//signUp API
app.post("/signup", async (req,res)=>{
    
    try{
        //validation of the data
        validation(req);
        //password Encryption
        const {firstName, lastName, emailId ,password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);

        //creating a new instance of the user model
        const user  = new User({firstName, lastName,emailId,password:passwordHash});
        await user.save();
        res.send("data is successfully added into the database");
    }catch(err){
        res.status(500).send("Something went Wrong " + err.message);
    }
})

//login API
app.post("/login",async (req,res)=>{

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
          //  console.log(token);

            //add a jwt token into the cookie.
            res.cookie("token",token,{expires: new Date(Date.now()+ 7*3600000)});

            res.send("logIn successfully");
        }else{
            throw new Error("Invalid Credential");
        }

   }catch(err){
     res.status(500).send("Not able to logged in: "  + err.message);
   }
})

//profile API
app.get("/profile",userAuth,async (req,res)=>{

        try{
            const user = req.user;
            res.send(user);

        }catch(err){
            res.send("something went wrong in profile: " + err.message);
        }
})

//API connection request
app.post("/connectionRequest",userAuth,async (req,res)=>{
    try{
        const user =  req.user
        res.send(user);
    }catch(err){
        res.send("something went wrong: " + err.message);
    }
})

//database connection
connectDb().then(()=>{
    console.log("database is connected");

    app.listen(7777,()=>{
        console.log("server is listening on 7777 port");
    });

}).catch(err=>{
    console.log("database connection is not established");
})