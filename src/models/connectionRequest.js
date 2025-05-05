const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//it is the reference to the User collection model, now it can take the refrence from the fromUserId and populate the data in userCollection database.
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//it is the reference to the User collection model, now it can take the refrence from the fromUserId and populate the data in userCollection database.
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:{
            values:["ignored", "interested", "accepted", "rejected"],
            message:"{VALUE} is incorrect status type"
        }
    }

},{timestamps: true});

connectionRequestSchema.index({
    fromUserId:1,
    toUserId:1
})

connectionRequestSchema.pre( "save" ,function (next){
    const connectionRequest = this;

    //checking is user not sending request to itself
    if(connectionRequest.toUserId.toString() === connectionRequest.fromUserId.toString()){
       throw new Error("you can not send request to yourself");
    }
    next();

})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema)