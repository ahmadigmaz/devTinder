const validator = require("validator");

const validation = (req)=>{
    const {firstName, lastName, emailId,  password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not Valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong")
    }
}

const  validateEditProfileData = (req) => {
    const isAllowed = ["firstName", "lastName", "age", "gender", "emailId", "about", "skills"];

    const isEditAllowed =  Object.keys(req.body).every((key) =>{
       return isAllowed.includes(key)
});
    return isEditAllowed;
}      

module.exports = {validation , validateEditProfileData};