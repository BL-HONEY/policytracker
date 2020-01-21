var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');
var policyCarrierSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Agent name is required'],
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});

var PolicyCarrier = mongoose.model('policyCarrier', policyCarrierSchema, 'policyCarrier');

class PolicyCarrierModel {

    create(policyCarrierInfo, callback) {
        // var searchquery = { $or: [{ "agentName": { $regex: new RegExp("^" + agentInfo + "$", "i") } }] };
        // console.log("agentInfo:", agentInfo);

        PolicyCarrier.find({companyName:policyCarrierInfo}, (err, data) => {
            if (err) {
                console.log("errr:", err);
                
                return callback(err);
            } else {
                // console.log("result before: ", data);

                if (data.length > 0) {
                    return callback(null,data[0])
                } else {
                    const policyCarrierData = new PolicyCarrier({
                        companyName: policyCarrierInfo.trim()
                    });
                    policyCarrierData.save((err, result) => {
                        if (err) {
                            return callback(err, null);
                        } else {
                            return callback(null, result);
                        }
                    })
                }
            }
        })
    }
}

module.exports = new PolicyCarrierModel();