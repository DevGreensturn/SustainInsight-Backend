const mongoose = require('mongoose');

// Define the schema
const endUserSchema = new mongoose.Schema({
  packageID: {
    type: Number,
    required: false
  },
  userName: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roleId: {
    type: mongoose.Types.ObjectId,
    default:null,
    required: true
  },
  status: {
    type:String,
    default:"ACTIVE",
    required: false
  },
  country_id: {
    type:mongoose.Types.ObjectId,
    default:"ACTIVE",
    required: false
  },
  source: {
    type:String,
    default:"Email",
    required: false
  },
},
{timestamps:true}
);

// Create a model from the schema
const EndUser = mongoose.model('userDetail', endUserSchema);

module.exports = EndUser;
