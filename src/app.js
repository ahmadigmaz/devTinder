const express = require("express");

const app = express();

// use ,method is used to fetch all types of HTTPS request;
app.use("/test",
(req,res,next)=>{
    console.log("response of the first");
   // res.send("response-1");
    next();
},
(req,res,next)=>{
    console.log("response of the second");
    //res.send("response-2");
    next();
},
(req,res)=>{
    console.log("rH third");
    res.send("response-3");
});

app.listen(3000,()=>{
    console.log("server is listening on 3000 port");
});