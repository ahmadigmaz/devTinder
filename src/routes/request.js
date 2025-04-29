const express = require("express");
const requestRouter = express.Router();
const {userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");
const { connection } = require("mongoose");
const connectionRequest = require("../models/connectionRequest");

//API sending connection request
requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
        const status = req.params.status;
        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id;

        //allowed request
        const isAllowed = ["ignored","interested"];
        if(!isAllowed.includes(status)){
            throw new Error(`${status} is not allowed`)
        }

        //checking that toUser is valid or not
        const isToUserValid = await user.findById(toUserId); 
        if(!isToUserValid){
            return res.status(400).json({
                message:"Invalid User"
            })
        }

        //checking connection request already exist or not
        const connectionRequestAlreadyExist = await ConnectionRequest.findOne({
           $or:[{fromUserId, toUserId},{fromUserId:toUserId, toUserId:fromUserId}]
        })
        if(connectionRequestAlreadyExist){
            const existStatus = connectionRequestAlreadyExist.status;
            return res.status(400).json({
                message: `request already exist as: ${existStatus}`
            })
        }


        const connectionRequest = new ConnectionRequest({status,toUserId,fromUserId});
        const data =  await connectionRequest.save();
        const sendersName = await user.findById(fromUserId).select("firstName");
        const receiversName = await user.findById(toUserId).select("firstName");

        const sendersFirstName = sendersName.firstName;
        const receiversFirstName = receiversName.firstName;
        let message = "";
        if(status==="interested"){
            message =   `${sendersFirstName} is interested in ${receiversFirstName}`
        }else{
            message = `${sendersFirstName}  ignored  ${receiversFirstName}`
        }

        res.json({
            message:message,
            data
        })

    }catch(err){
        res.send("Something went wrong "+ err.message);
    }
})

//API reviewing connection request
requestRouter.post("/request/receive/:status/:requestId",userAuth, async(req, res)=>{
    try{
        //validate the status=>status is allowed or not
         const isAllowed = ["accepted", "rejected"];
         const status = req.params.status;
         if(!isAllowed.includes(status)){
            return  res.status(400).json({
                message:"invalid status"
            })
         }
         const logedInUser = req.user;
         const requestId = req.params.requestId;
        
        //divyanshu->deepali=>checked that deepali should logIn before accepting or rejecting the request
        //status should be interested
        //requestId should be valid meaning it should be present in our database. 
         const validConnectionRequest = await connectionRequest.findOne({
            _id: requestId,
            toUserId: logedInUser._id,
            status: "interested"
         })
         

         if(!validConnectionRequest){
            return res.status(400).json({
                message: `invalid connection request: ${status}`
            })
         }

        validConnectionRequest.status = status;
        const data = await validConnectionRequest.save();
        res.json({
            message:`connection request has been ${status}`,
            data
        })

    }catch(err){
        res.status(400).send("Something went wrong: " + err);
    }

})


module.exports = requestRouter;