const UserRolesModel = require("../model/UserRolesModelSchema");


const createUserRoles = async (req, res) => {
  try {
    const { roleName } = req.body;
    if(!roleName) {
      
      return res.status(400).send({
        status: false,
        message: "Please provide role name",
        response: null
      });
    }
    let isRoleExist = await UserRolesModel.findOne({"roleName": roleName.toUpperCase()}).lean()
     if(isRoleExist) {
     
      return res.status(400).send({status: false,message: "Roles already exists",response: null});
    }
    const userRoles = new UserRolesModel(req.body);
    await userRoles.save();
   
    return res.status(201).send({
      status: true,
      message: "Roles Data saved",
      response: userRoles
    });
  } catch (error) {
    
    return res.status(500).send({ message: error.message, success: 0 });
  }
};

const getUsersRoles = async (req, res) => {


  try {
    const allData = await UserRolesModel.find().populate({
      path: 'permissions.moduleId', options: { strictPopulate: false }
    })

    return res.status(200).send({
      status: true,
      message: "Roles Data",
      response: allData
    });
  } catch (error) {
		 
    return res.status(500).send(error.message);
  }
};

const updateUserRoles = async (req, res) => {
  try {
    const id = req.params.id;
    const { roleName, createdBy,permissions,status } = req.body;
    const moduleData = {
      roleName: roleName,
      createdBy: createdBy ? createdBy : "",
      permissions: permissions,
      status: status
    };
    const options = { new: true };
    const findRoles = await UserRolesModel.findById(id);
    if (!findRoles) {
     
      return res.status(404).send({ message: message.NotFound, status: message.FalseStatus })
    } else {
      const result = await UserRolesModel.findByIdAndUpdate(id, moduleData, options);
      
      return res.status(200).send({
        status: true,
        message: "roles Data updated",
        response: result,
      });
    }
  } catch (error) {
    
    return res.status(500).send({ message: error.message });
  }
};

const userRoleByid = async (req, res) => {
  try {
    const id = req.params.id;
    const findRoles = await UserRolesModel.findById(id).populate({
      path: 'permissions.moduleId', options: { strictPopulate: false }
    });
    console.log("findRoles", findRoles);
   
    return res.status(200).send({
      status: true,
      message: "User Data",
      response: findRoles,
    });
  } catch (error) {
   
    return res.status(500).send(error.message);
  }
};



module.exports = {
  createUserRoles,
  getUsersRoles,
  updateUserRoles,
  userRoleByid
};
