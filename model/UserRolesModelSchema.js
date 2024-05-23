

var mongoose = require("mongoose");
const usermodules = require('./UserModulesModel');
// const projectsSchema = require('./projectSchema');
var UserRolesSchema = new mongoose.Schema({
    roleName: {
        type: String
    },
    permissions: [
        {
            moduleId : {
                type:mongoose.Types.ObjectId,
                ref: usermodules
            },
            allowed: {
                type:Boolean,
                default:false
            },
            actions : {
                edit: {
                    type: Boolean,
                    default:false
                },
                delete: {
                    type: Boolean,
                    default:false
                },
                create: {
                    type: Boolean,
                    default:false
                },
                view: {
                    type: Boolean,
                    default:false
                }
            },
            permissions: [
                {
                    subModuleId: {
                        type:mongoose.Types.ObjectId
                    },
                    tabPermissions: [
                        {
                            tabId: {
                                type:mongoose.Types.ObjectId
                            },
                            actions: {
                                edit: {
                                    type: Boolean,
                                    default:false
                                },
                                delete: {
                                    type: Boolean,
                                    default:false
                                },
                                create: {
                                    type: Boolean,
                                    default:false
                                },
                                view: {
                                    type: Boolean,
                                    default:false
                                }
                            }
                        }
                    ],
                    allowed: {
                        type:Boolean,
                        default:false
                    },
                    actions : {
                        edit: {
                            type: Boolean,
                            default:false
                        },
                        delete: {
                            type: Boolean,
                            default:false
                        },
                        create: {
                            type: Boolean,
                            default:false
                        },
                        view: {
                            type: Boolean,
                            default:false
                        }
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

module.exports = mongoose.model("userroles", UserRolesSchema);