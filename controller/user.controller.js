import User from "../model/User.model.js"
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registeruser= async (req,res) => {
    // get data
    // validate
    // check if user already exist
    // create a user in database
    // create a verification token
    // save token in database 
    // send token as email to user
    // send success status to user

    const {name, email, password}= req.body

if(!name || !email || !password ) {

    return res.status(400).json({
        message: "All fields are required"
    })
}
try {
  const existingUser = await User.findOne({email})
  if(existingUser){
      return res.status(400).json({
        message: "User already exists "
      })
  }

    const user = await User.create({
    name,
    email,
    password
  })
 
  console.log(user);


 if(!user){
    return res.status(400).json({
        message: "User not registered "
      })
 }


     const token = crypto.randomBytes(32).toString("hex")
     console.log(token);


    user.verificationToken=token;


     await user.save();


// send email
     const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      });
   
     const mailoption = {
       
    from: process.env.MAILTRAP_SENDEREMAIL,
    to: user.email,
    subject: "Verify your email ", 
    text: ` Please click on the following link:
    ${process.env.BASE_URL}/api/v1/users/verify/${token}
    `,
    
     };

      transporter.sendMail(mailoption)

     res.status(201).json({
       message: "User register successfully",
       success :true 
     })




}catch (error) { 

    res.status(400).json({
        message: "User not registered ",
        error,
        success :false 
      })
  
}


};

const verifyUser= async (req,res) => {

// get token from url
// validate token
// find user based on token
// set is verified field to true
// remove verification token
// save 
// return response

const {token} =req.params;


console.log(token);
 if(!token) {
    return res.status(400).json({
        message: "invalid token"
    });
 }

 const user =await User.findOne({verificationToken:token})

 if(!user) {
    return res.status(400).json({
        message: "invalid token"
    });
 }


  user.isVerified=true;

  user.verificationToken=undefined;

   await user.save()

    return res.status(201)

};

const login = async (req,res) => {

  1
  // 1. get data 
  const {email, password } = req.body

  console.log(email);

// 2. validate

  if(!email || !password) {
    return res.status(400).json({
      message: "All fileds are required"
    })
  }
  console.log("all field are required")

try {
      const user= await User.findOne({email})
      if(!user) {
        return res.status(400).json({
          message: "invalid email or password",
        }); }

  console.log("failed to validate data")


        const isMatch=  await bcrypt.compare(password,user.password)

        console.log(isMatch);
        
        if(!isMatch) {
          return res.status(400).json({
            message: "invalid email or password",
          }); 
        }

        console.log("invalid passworf");
 

        const accessToken=jwt.sign({id:user._id},
          process.env.ACCESSTOKEN_SECRET,
           {expiresIn: process.env.ACCESSTOKEN_EXPIRY,})
        const refreshToken=jwt.sign({id:user._id},
          process.env.REFRESHTOKEN_SECRET,
           {expiresIn: process.env.REFRESHTOKEN_EXPIRY,})

          user.refreshToken=refreshToken


          await user.save();



          //  const token= jwt.sign(
          //   {id: user._id, role: user.role},
          //    process.env.JWT_SECRET,
          //    {
          //     expiresIn:"24h",
          //    });
          // console.log("token sign successful")










      // SET COOKIE 
          const cookieOptions= {
            httpOnly: true,
            secure:true,
            maxAge:24 * 60 * 60 * 1000,
          };

          console.log("cokkie");


          res.cookie("accessToken",accessToken,cookieOptions);
          res.cookie("refreshtoken",refreshToken,cookieOptions);


          res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user._id,
            name : user.name,
            role: user.role,

          }


          })
      
}

catch (error) {
}
}

const getMe =async (req,res) => {
try {
   const user= User.findById(req.user.id).select('-password');
   
    if(!user){
      return res.status(400).json({
        success:false,
        message: "All fileds are required"
      });
    }


res.status(200).json({
  success:true,

})

} catch (error) {
  
}
}

const logoutUser = async (req, res) => {
 
    try {
      res.cookie('token', ' ', {}, {
        expires: new Date(0) 

      })

      res.status(200).json({
        success:true,
        message: "logged out successfully",
      
      })

    } catch (error) {
      
    }

};
const forgotPassword = async (req, res) => {
 

  
};
const resetPassword = async (req, res) => {

};



export {registeruser,verifyUser,login ,getMe,logoutUser,resetPassword,forgotPassword};


