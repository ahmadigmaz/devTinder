const { mongoose } = require("mongoose");

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://ahmadigmaz:TJsmKSmk8h2XhaJt@namastenode.nqyd3ei.mongodb.net/devTinder");
};

module.exports = {connectDb};

