const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstname:"igmaz",lastname:"Ahmad"});
});

app.post("/user",(req,res)=>{
    //logic to send the data to the database
    res.send("the database is successfully saved to the database");
})

app.delete('/user',(req,res)=>{
    res.send("delete the data from the db");
})

// use ,method is used to fetch all types of HTTPS request;
app.use("/test",(req,res)=>{
    res.send("hello world!!!!!!!!");
});

app.listen(3000,()=>{
    console.log("server is listening on 3000 port");
});