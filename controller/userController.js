
const allUsers = require("../model/endUserModel");
const roleSchema = require("../model/UserRolesModelSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

const createUser = async (req, res) => {
  console.log("working")
  const {packageID=1, email, userName,loginType,password,country_id} = req.body;
  
  try {
    if (!email|| !userName || !password ) {
      return res.status(400).json({ message: 'EndUserEmail, EndUserName, EndUserHashPassword   are required' });
    }
    let roleData = await roleSchema.findOne({"roleName": loginType.trim()})
    
    if(!roleData) {
      return res.status(404).send({ message: "User role not found!", status: false });
    }
    
    // Check if the user already exists
    let isExistEmail = await allUsers.findOne({"email": email.trim()});
    if(isExistEmail) {
      return res.status(400).send({ message: "Email address is already registered", status: false });
    }
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    req.body.roleId = roleData._id;
    console.log(req.body);
    const newUser = new allUsers(req.body);

    await newUser.save();

    res.status(201).send({ message: "User registered, please login!", status: true });
  } catch (error) {
    console.log("error====",error)
    res.status(500).send({ message: error.message, status: false ,error});
  }
}
const userLogin = async (req, res) => {
  const { email, password,loginType } = req.body;
  try {
    const user = await allUsers.findOne({
      "email": { $regex: email, $options: "i" },
    });

    if (!user) {
      return res.status(404).json({
        message: "Login Error: User does not exist.",
        status: false,
        sessionExist: false,
      });
    }
    
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      
       return res.status(400).json({
          message: "Invalid Credentials.",
          status: false,
          sessionExist: false,
          loginAttempt: user.loginAttempt,
        });
    }
    if(user.status!="ACTIVE"){
      return res.status(400).json({
        message:
          "Please contact to support. Your account is not activate",
        status: false,
        sessionExist: false,
      });
    }
    let dataExist = {
      "_id":user._id,
      "email":email,
      "loginType":loginType,
      "timestamp":Date.now()
    };
    const jwtPayload = dataExist;
    console.log(process.env.JWT_EXPIRY);
    const jwtDate = { expiresIn: process.env.JWT_EXPIRY };

    dataExist.token = jwt.sign(jwtPayload, process.env.jwt_secretKey, jwtDate);

    return res.status(200).json({
      message: "Logged In!",
      status: true,
      sessionExist: true,
      data: user,
      token: dataExist.token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
      sessionExist: false,
      error: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    if(req.body.password){
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    let updatedUser = await allUsers.findOneAndUpdate({ _id: req.params.id },
      { $set: req.body }, { new: true }).lean();
      console.log(updatedUser,"updatedUser updatedUser");
      if(updatedUser){
        return res.status(200).send({ status: true, message: "Your profile has been successfully updated!", data: updatedUser })
      }else{
        return res.status(200).send({ status: true, message: "Error in updating the profile!", data: updatedUser })
      }

  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: "Internal server error",error:error })
  }
}
const googleLogin = async(req,res)=>{
  const {data} = req.body;
  try{
  const ticket = await client.verifyIdToken({
    idToken: data.token,
    audience:data.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  console.log(payload);
  const userid = payload['sub'];
  const isExist = await allUsers.findOne({ "email": { $regex: data.email } });
  if (isExist) {
      isExist.basicInfo.userName = data.name;
      isExist.basicInfo.firstName = data.given_name;
      isExist.basicInfo.lastName = data.family_name;
      isExist.email = data.email;
      isExist.status = isExist.status;
      savedData = await isExist.save();
      let dataExist = {
        "_id":savedData._id,
        "email":savedData.email,
        "loginType":savedData.loginType,
        "timestamp":Date.now()
      };
      const jwtPayload = dataExist;
      console.log(process.env.JWT_EXPIRY);
      const jwtDate = { expiresIn: process.env.JWT_EXPIRY };
  
      dataExist.token = jwt.sign(jwtPayload, process.env.jwt_secretKey, jwtDate);
      
      return res.status(200).json({
        message: "Logged In!",
        status: true,
        sessionExist: true,
        data: savedData,
        token: dataExist.token
      });
  } else {
      const loginData = new allUsers();
      loginData.userName = data.name;
      loginData.firstName = data.given_name;
      loginData.lastName = data.family_name;
      loginData.email = data.email;
      loginData.picture = "";
      loginData.source = "Google";
      loginData.status = "Approved";
      loginData.save();
      let dataExist = {
        "_id":loginData._id,
        "email":loginData.email,
        "loginType":loginData.loginType,
        "timestamp":Date.now()
      };
      const jwtPayload = dataExist;
      console.log(process.env.JWT_EXPIRY);
      const jwtDate = { expiresIn: process.env.JWT_EXPIRY };
  
      dataExist.token = jwt.sign(jwtPayload, process.env.jwt_secretKey, jwtDate);
      
      return res.status(200).json({
        message: "Logged In!",
        status: true,
        sessionExist: true,
        data: savedData,
        token: dataExist.token
      });
  }
  }catch(error){
    console.log(error);
    return res.status(500).send({ sessionExist: false,status: false, message: "Internal server error",error:error })
  }
}
module.exports = {createUser,updateUser,userLogin,googleLogin};
