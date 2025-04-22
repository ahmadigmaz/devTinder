const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
    try{
        //read the token comming out from the cookies
        const {token} = req.cookies;
       
        //validate the token
        if(!token){
            throw new Error("token is not valid");
        }
        const userData =  await jwt.verify(token,"Dev@Tinder$123");

        //find the user
        const userId = userData._id;
        const user = await User.findById({_id:userId});
        if(!user){
            throw new console.error("user not found");
        }
       // console.log(user);
        req.user = user;
        next();
        
    }catch(err){
        res.send("user is not authenticated " + err.message);
    }

}


module.exports = {
    userAuth
}