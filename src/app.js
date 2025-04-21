const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const {connectDb} = require("./config/database");
const User = require("./models/user");
const {validation} = require("./utils/validation");
app.use(express.json());
const bcrypt = require("bcrypt");
const validator = require("validator");

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
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("logIn successfully");
        }else{
            throw new Error("Invalid Credential");
        }

   }catch(err){
     res.status(500).send("Not able to logged in: "  + err.message);
   }
})


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
//get the user from the database by its Id;
app.get("/user2",async (req,res)=>{
    const userId = req.body._id;

    try{
        const user = await User.findById({_id:userId});
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

//delete user from the database by Model.findByIdAndDelete()

app.delete("/delete", async(req,res)=>{

    const userId = req.body._id;
    try{
       // const user = await User.findByIdAndDelete({userId}); not working for me right now, I dont know why.
        const user = await User.findByIdAndDelete({_id:userId});
        res.send("user is deleted");
    }catch{(err)
        res.status(404).send("something went wrong");
    }
})

//update the data of the user with the help of userID
app.patch("/update/:userId", async(req,res)=>{
    const userId  = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = [ "firstName", "lastName","photoUrl", "about", "gender", "age", "skills" ];

        const isAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
    
         if(!isAllowed){
            throw new Error("updates not allowed");
         }
         if(data?.skills.length >10){
            throw new Error("Skills size should be less than 10");
         }

        const user = await User.findByIdAndUpdate({_id:userId}, data, 
            {   
                returnDocument:"Before",
                runValidators: true
            });
        res.send("data is updated successfully");
    }catch(err){
        res.status(404).send("Something Went wrong " + err.message);
    }
})

//update the data of the user with the help of the emailId
app.patch("/update1",async (req,res)=>{
    const email = req.body.emailId;
    const data = req.body;
    try{
        const user =  await User.findOneAndUpdate({emailId:email},data);
        res.send("user data updated successfully");
    }catch(err){
        res.status(404).send("Something Went wrong");
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