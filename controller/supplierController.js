
const supplier = require("../model/supplierModel");
const roleSchema = require("../model/UserRolesModelSchema");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const createSupplier = async (req, res) => {
    const {loginType} = req.body;
    try {
    let roleData = await roleSchema.findOne({"roleName": loginType.trim()})
    
    if(!roleData) {
      return res.status(404).send({ message: "User role not found!", status: false });
    }
    req.body.roleId = roleData._id;
    const newUser = new supplier(req.body);
    await newUser.save();
    res.status(201).send({ message: "Supplier registered", status: true });
  } catch (error) {
    console.log("error====",error)
    res.status(500).send({ message: error.message, status: false ,error});
  }
}
const getSupplier = async (req, res) => {
    const {id,projectId} = req.params;
    try {
        let allData;
        if(id){
            allData = await supplier.find().populate("projectId packageId").lean(); 
        }else{
           allData = await supplier.find({projectId:projectId}).populate("projectId packageId").lean(); 
        }
      return res.status(200).send({
        status: true,
        message: "Get Supplier data",
        response: allData
      });
    } catch (error) {
           
      return res.status(500).send(error.message);
    }
};
const updateSupplier = async(req,res)=>{
    const {id} = req.params;
    try{
        const data = await supplier.findByIdAndUpdate(id,req.body,{new:true});
        if(data){
            return res.status(200).send({
                status: true,
                message: "Supplier data is updated",
                response: data
            });
        }
    }catch(error){
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            response: error
        });
    }
}
const deleteSupplier = async(req,res)=>{
    const {id} = req.params;
    try{
        const data = await supplier.findByIdAndDelete(id);
        if(data){
            return res.status(200).send({
                status: true,
                message: "Supplier data is updated",
                response: data
            });
        }
    }catch(error){
        return res.status(500).send({
            status: false,
            message: "Internal Server Error",
            response: error
        });
    }
}

module.exports = {createSupplier,getSupplier,updateSupplier,deleteSupplier};
