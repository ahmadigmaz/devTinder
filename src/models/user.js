const mongoose = require("mongoose");

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
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        validate: {
          validator: function (value) {
            // At least one uppercase, one lowercase, one digit, one special char
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
          },
          message: "Password must contain uppercase, lowercase, number, and special character"
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
        default: "https/dummyimage/cbijd/242/sv"
    },
    about:{
        type:String,
        default: "Default Value"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})
module.exports = mongoose.model('User', userSchema);