const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        enum: ['Male', 'Female', 'Other']       
    },
    photoUrl:{
        type:String,
        default: "https://www.un.org/pga/wp-content/uploads/sites/53/2018/09/Dummy-image-1.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL is Invalid");
            }
        }
    },
    about:{
        type:String,
        maxLength: 100,
        default: "Default Value!!!!!"
    },
    skills: {
        type: [String]
      }      
},{
    timestamps:true
})

userSchema.methods.getJWT = async function (){
    const user = this;
    return await jwt.sign({_id:user._id}, "Dev@Tinder$123",{expiresIn: "7d"}); 
}

userSchema.methods.passwordValidity = async function(passwordInputByUser){
    const user  = this;
    return await bcrypt.compare(passwordInputByUser,user.password);
} 
module.exports = mongoose.model('User', userSchema);