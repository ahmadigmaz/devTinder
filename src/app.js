const express = require("express");

const app = express();

app.use("/hello",(req,res)=>{
    res.send("hello hello hello world i am comming by nodemon command");
});

app.use("/test",(req,res)=>{
    res.send("hello world");
});

app.listen(3000,()=>{
    console.log("server is listening on 3000 port");
});