let mongoose = require("mongoose");

let CodesSchema = new mongoose.Schema({
    "name": {
        type: String,
        default: null
    },
    "currency": {
        "currencyCode": {
            type: Array,
            default: []
        },
        "currencyName": {
            type: Array,
            default: []
        },
        "currencySymbol": {
            type: Array,
            default: []
        }
    },
    "info": {
        "shortName": {
            type: String,
            default: null
        },
        "longName": {
            type: String,
            default: null
        },
        "alpha2": {
            type: String,
            default: null
        },
        "alpha3": {
            type: String,
            default: null
        },
        "isoNumericCode": {
            type: String,
            default: null
        },
        "ioc": {
            type: String,
            default: null
        },
        "capitalCity": {
            type: String,
            default: null
        },
        "tld": {
            type: String,
            default: null
        },
        "flag": {
            type: String,
            default: null
        }
    },
    "languages": {
        type: Array,
        default: []
    },
    "phone": {
        "countryCode": {
            type: mongoose.Schema.Types.Mixed,
            default: []
        },
        "mobile_begin_with": {
            type: Array,
            default: []
        },
        "phone_number_lengths": {
            type: Array,
            default: []
        }
    },
    "postal": {
        "Description": {
            type: String,
            default: null
        },
        "RedundantCharacters": {
            type: String,
            default: null
        },
        "ValidationRegex": {
            type: String,
            default: null
        },
        "charSet": {
            type: String,
            default: null
        },
        "postalLengths": {
            type: Array,
            default: []
        },
        "postalFormats": {
            type: Array,
            default: []
        }
    },
    "states": {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



module.exports = mongoose.model("countrycode", CodesSchema);
