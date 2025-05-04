const express = require("express");
const app = express();
const {connectDb} = require("./config/database");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors")


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend port
    credentials: true // Allow cookies and credentials if needed
}));


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);




//database connection
connectDb().then(()=>{
    console.log("database is connected");

    app.listen(7777,()=>{
        console.log("server is listening on 7777 port");
    });

}).catch(err=>{
    console.log("database connection is not established");
})