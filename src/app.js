const express = require("express");
const app = express();
const {connectDb} = require("./config/database");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors")
const http = require("http");

require('dotenv').config()
require("./utils/cronjob")

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend port
    credentials: true // Allow cookies and credentials if needed
}));


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

//create server for the sockets

const server = http.createServer(app);
initializeSocket(server);


//database connection
connectDb().then(()=>{
    console.log("database is connected");

    server.listen(process.env.PORT ,()=>{
        console.log("server is listening on 7777 port");
    });

}).catch(err=>{
    console.log("database connection is not established");
})
