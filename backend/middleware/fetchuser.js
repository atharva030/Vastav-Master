var jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY || "atharva$$!oy";

const fetchuser=(req,res,next)=>{
    //get user from JWT_TOKEN
const token=req.header('auth-token');//this will sennd the request to header using the name auth-token for getting the token 
 if(!token){
    res.status(401).send({error:"Please Authenticate using valid token"})
 }  
 try {
    const data=jwt.verify(token,jwtSecretKey);
    req.user=data.user;//getting user in original pattern from the token
    next();
} catch (error) {
    res.status(401).send({error:"Please Authenticate using valid token"})
 } 
//this is used to call the async function next to the fetchdata
}

module.exports=fetchuser