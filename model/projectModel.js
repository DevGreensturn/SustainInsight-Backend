const mongoose = require('mongoose');

// Define the schema
const projectSchema = new mongoose.Schema({
  referenceNo: {
    type: Number,
    required: false
  },
  projectName: {
    type: String,
    required: false
  },
  projectPackageId: {
    type: mongoose.Types.ObjectId,
    ref:"package",
    required: false
  },
  mainContractor: {
    type: String,
    required: false
  },
  topology: {
    type: String,
    required: false
  },
  packageCurrentPackage: {
    type: String,
    required: true,
    unique: true
  },
  manHours: {
    type: String,
    required: true
  },
 
  plotArea: {
    type:String,
    required: false
  },
  gfa: {
    type:String,
    required: false
  },
  roadLength: {
    type:String,
   
    required: false
  },
  infrastructure: {
    type:String,
    required: false
  },
  SubscriptionCategory: {
    type: String,
    enum: [
      "Building",
      "Road",
      "Infrastructure"
    ],
    required: false
  },
  subscriptionTier: {
    type:String,
    required: false
  },
  SustainabilityRating: {
    type: String,
    required: false
  }
},
{timestamps:true}
);

// Create a model from the schema
const project = mongoose.model('project', projectSchema);

module.exports = project;
