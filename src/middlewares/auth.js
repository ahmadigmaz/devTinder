const adminAuth = (req,res,next)=>{
    const token = "xyz"; 
    const isAdminAuthorised = "xyz"===token;

    if(!isAdminAuthorised){
        res.status(401).send("admin is not authorised");
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyz"; 
    const isAdminAuthorised = "xyz"===token;

    if(!isAdminAuthorised){
        res.status(401).send("user is not authorised");
    }else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth
}