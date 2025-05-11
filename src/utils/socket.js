const socket = require("socket.io")

const initializeSocket =  (server) =>{

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            //credentials: true
        }
    })

    io.on("connection", (socket) => {
        
        socket.on("joinChat", ({firstName, userId, targetUserId}) => {
            const roomId  = [userId, targetUserId].sort().join("_");
            socket.join(roomId)
        })

        socket.on("sendMessage", ({ firstName, userId, targetUserId, text}) => {
            const roomId  = [userId, targetUserId].sort().join("_");
            io.to(roomId).emit("messageReceived", {firstName, text});
        })

        socket.on("disconnect", () => {})
        
    })
}

module.exports = initializeSocket;