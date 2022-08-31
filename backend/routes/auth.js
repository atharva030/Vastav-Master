const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchuser= require("../middleware/fetchuser")
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwtSecretKey = process.env.JWT_SECRET_KEY || "atharva$$!oy";



// ROUTE 1: create user using: POST "/api/auth/createuser" Dosen't require auth i.e. no login required
router.post("/createuser",
  [
    body("name", "Enter Valid Name").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are error return bad request and errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      const password = req.body.password;
      //creating new users
      
      let user = await User.findOne({ email: req.body.email }); //check for duplicate email
      if (user) {
        return res.status(400).json({success, error: "User with this email already exists" });
      }
      
      //hashing techninque for password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //  .then(user => res.json(user)).catch(err=>{
      //    console.log(err);
      //    res.json({error:"Please enter unique value for email",message:err.message})
      //  })

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, 'shhhhh');//shhhhh is a JWT_SECRET
      
     success=true;
      res.json({success,authToken});
    
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error:"Internal Server Error"});
    }
    //check whether the user with this email is exits or not?
  }
);
//ROUTE 2:Authenticate user using: POST "/api/auth/login" Dosen't require auth i.e. no login required
router.post("/login",[body("email", "Enter Valid Email").isEmail(), body('password','Password cannot be blank').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let success=false 
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
      let user=await User.findOne({email}); //pulling email from the db
      if(!user){
        success=false 
        return res.status(400).json("Please try to login with correct Credential");
      }

      const passswordCompare=await bcrypt.compare(password,user.password); //this will match hashes internally
       if(!passswordCompare){
        success=false 
        return res.status(400).json({success,error:"Please try to login with correct Credential"});
      }
  //This data will be stored in token
       const data = {
        user: {
          id: user.id, 
        },
      };
      const authToken = jwt.sign(data, jwtSecretKey);
      
      success=true
      res.json({success,authToken}); //sending authToken and success i.e whether it is working or not
    } catch (error) {
       console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
  )
//ROUTE 3: Get logged in user using: POST "/api/auth/getuser" Dosen't require auth i.e. no login required
router.post("/getuser",fetchuser,async (req, res) => {
  
try {
  userId=req.user.id;//this will take the info from the fetch.js
  const user=await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.log(error.message);
      res.status(500).send("Internal Server Error");
}
})
module.exports = router;
