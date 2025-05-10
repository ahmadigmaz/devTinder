const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
    try{
        //read the token comming out from the cookies
        const {token} = req.cookies;
       
        //validate the token
        if(!token){
            return res.status(401).send("Login Again Please")
        }
        const userData =  await jwt.verify(token,process.env.JWT_SECRET);

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