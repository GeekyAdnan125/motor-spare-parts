const User = require('../modals/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
exports.signupHandler = async(req , res) => {
    try{
        // fetch the data from the req body 
        const {name , email , password} = req.body;
        //now check the user is exist or not 
        const existUser = await User.findOne({email});
        if(existUser) {
            console.log(email,"is allready exits in the database");
            return res.status(400).json({
                success:false,
                message:"User is already exist , plese go to login in section "
            })
        }
        // now validata the password using bcrypt.js
        let haspassword ;
        try{
            haspassword = await bcrypt.hash(password,saltRounds);

        }catch(err){
            console.log("error in hasisng the password " , err);
            return res.status(400).json({
                success:false,
                message:"Error in hashing the pasword !! kindely check the saltROunds"
            })    
        }

        //Now creata a entry into the database
        const user =  await User.create({
            name , email, password:haspassword 
        })
        res.status(201).json({
            success:true,
            User: {
                name , email
            },
            message:'User is successfully registered '
        })
    } catch (err) {
        return res.status(400).json({
            success:false,
            message:"Getting error while regestering the user "
        })
    }
}

// login 

exports.login = async (req, res)=>{
    try{
      const {email,password} = req.body;
      if(!email || !password) {
        console.log("I am from 56th line")
        res.status(500).json({
            success:false,
            message:"please fill the all field carefully"
        })
      }
      const user = await User.findOne({email});
      if(!user ){

        res.status(401).json({
            success:false,
            message:"email is not registered"
        })
      }
      // veryify the password and generate a JWT token
      const payload = {
        email:user.email,
        id:user._id,
        role:user.role
      }
      if(await bcrypt.compare(password,user.password)) {
        let token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:"4h"}
        ) 
       user.token = token
       user.password = undefined 
        //cookies ke  andar 3 parameter -> 1. cookie name , cookie data , options(expiray time , etc)
        const options = {
            expiresIn:new Date(Date.now() + 5*24*60*60*1000), // 5 din tak and time in nano second liya jaata h 
            httpOnly:true,
        }         
        res.cookie("adnanCookie" , token , options).status(200).json({
            success:true,
            token,
            user,
            meassage:"User loged in successfully"
        })
      } else {
        return res.status(403).json({
            success:false,
            message:"Password Incorrect"
        })
      }
    }catch(err) {
        console.log( "error from line number 106" , err);
        res.status(500).json({
            success:false,
            meassage:'login failure'
        })
    }
}