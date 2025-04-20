const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:1,
        maxLength:50,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        minLength:1,
        maxLength:50,
        trim:true,
    },
    emailId:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true, // automatically converts to lowercase
        trim: true,      // removes extra spaces
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid");
            }
        }
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is not strong");
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        //enum: ['Male', 'Female', 'Other'],
        set: (value) => {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Format to: Male, Female, Other
        },
        validate: function(value) {
            if (!["Male", "Female", "Other"].includes(value)) {
                throw new Error("Gender is not valid");
            }
        }        
    },
    photoUrl:{
        type:String,
        default: "https://stock.adobe.com/search?k=dummy",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL is Invalid");
            }
        }
    },
    about:{
        type:String,
        maxLength: 100,
        default: "Default Value"
    },
    skills: {
        type: [String]
      }      
},{
    timestamps:true
})
module.exports = mongoose.model('User', userSchema);