const express = require("express");
const userRouter = express.Router();
const {userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequest");
const USER_VALUES = "firstName lastName age gender photoUrl skills about";

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{

        const logedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId:logedInUser._id,
            status: "interested"
    })//.populate("fromUserId","firstName, lastName, age, gender, photoUrl, skills");
    .populate("fromUserId",USER_VALUES)//first argument in populate takes the refernce meaning on what basis are you pupulating and second aregument is what are you pupulating

        res.json({
            message:"received request are as follows",
            data: connectionRequest
        });

    }catch(err){
        res.send("ERROR: " + err.message);
    }
})

userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{

        const loggedInUserId = req.user._id;
       // console.log(userId);
       // example: divyanshu=>deepali=>accepted
       //          deepali=>aviral =>accepted
       //          igmaz=>deepali =>accepted
       //          deepali=>anushka=>accepted
        const userData = await connectionRequest.find({
            $or:[{toUserId:loggedInUserId},
                {fromUserId:loggedInUserId}
            ],
            status: "accepted"
        }).populate("fromUserId",USER_VALUES)
          .populate("toUserId", USER_VALUES);

       const fromUserIdData =  userData.map(item =>{
            if(item.fromUserId._id.toString() === loggedInUserId.toString()){
                return item.toUserId;
            }
            return item.fromUserId
        })

        res.json({
            message: "all connections are: ",
            data: fromUserIdData
        })

    }catch(err){
        res.json({
            message: "ERROR: " + err.message
        })
    }
})

userRouter.get("/user/feed", userAuth, async (req, res) =>{
    try{
        const page = parseInt(req.query.page)|| 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        // lets give a one round of thinking what we are building, So suppose the loggedIN user is deepali-
        // what type of users we can't show to deepali---

        // ->the users which the deepali already rejected
        // ->the users which the deepali already accepted
        // ->and the deepali itself

        // ->the users who are interested in deepali
        // ->the users which the deepali is interested 
        const loggedInUser = req.user;

        //find all the received and send connections
        const allConnectionRequestSentOrReceive = await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        //remove the dublicates ids 
        const allUsersNotInFeedSet = new Set();
        const notInFeedId = allConnectionRequestSentOrReceive.forEach(item=>{
            allUsersNotInFeedSet.add(item.fromUserId.toString())
            allUsersNotInFeedSet.add(item.toUserId.toString());
        })
     
        //convert them into array as set will not work with $nin function
        const allUsersNotInFeedArray = Array.from(allUsersNotInFeedSet)

      const feed = await User.find({
        $and:[
        {_id: {$nin: allUsersNotInFeedArray}},
        {_id: {$ne: loggedInUser._id}}
      ]
      }).select(USER_VALUES).skip(skip).limit(limit);


        res.json({
            message: "Your feed is!!!!",
            data:feed
        })

    }catch(err){
        res.json({
            message: "ERROR: " + err.message
        })
    }
})

module.exports = userRouter;