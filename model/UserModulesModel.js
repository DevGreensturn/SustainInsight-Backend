var mongoose = require("mongoose");
var UserModulesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },
    path: {
        type: String
    },
    tabs: [
        {
            _id: {
                type: mongoose.Types.ObjectId
            },
            name: {
                type:String
            },
            path: {
                type:String
            }
        }
    ],
    subModule: [
        {
            _id: {
                type: mongoose.Types.ObjectId
            },
            icon: {
                type: String
            },
            name: {
                type: String
            },
            path: {
                type: String
            },
            tabs: [
                {
                    _id: {
                        type: mongoose.Types.ObjectId
                    },
                    name: {
                        type:String
                    },
                    path:{
                        type:String
                    }
                }
            ]
        }
    ],

	status: {
		type: String,
		Enum:['ACTIVE', 'INACTIVE'],
		default: "ACTIVE"
	},
	

}, {timestamps: true});

module.exports = mongoose.model("usermodules", UserModulesSchema);
