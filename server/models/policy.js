const mongoose = require('mongoose');

var policySchema = new mongoose.Schema({
    policyNumber: {
        type: String,
        required: [true, 'policy Number is required'],
    },
    premiumAmount: {
        type: String,
        required: [true, 'premium Amount is required'],
    },
    policyType: {
        type: String,
        required: [true, 'policy type is required'],
    },
    policyCarrier: {
        type: mongoose.Schema.Types.ObjectId, ref: 'policyCarrier',
        required: [true, 'policy carrier Id is required']
    },
    accountName: {
        type: mongoose.Schema.Types.ObjectId, ref: 'userAccount',
        required: [true, 'account name Id is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: [true, 'user Id is required']
    },
    lobId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'lob',
        required: [true, 'lob Id is required']
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'agent',
        required: [true, 'agent Id is required']
    },
    startDate: {
        type: String,
        required: [true, 'start date is required']
    },
    endDate: {
        type: String,
        required: [true, 'end date is required']
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

var Policy = mongoose.model('policy', policySchema, 'policy');

class PolicyModel {

    create(policyInfo, callback) {
        // var searchquery = { $or: [{ "agentName": { $regex: new RegExp("^" + agentInfo + "$", "i") } }] };
        // console.log("agentInfo:", agentInfo);

        Policy.find({ policyNumber: policyInfo.policyNumber }, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                // console.log("result before: ", data);

                if (data.length > 0) {
                    return callback(null, data[0])
                } else {
                    const policyData = new Policy({
                        policyNumber: policyInfo.policyNumber,
                        premiumAmount: policyInfo.premiumAmount,
                        policyType: policyInfo.policyType,
                        policyCarrier: policyInfo.policyCarrier,
                        accountName: policyInfo.accountName,
                        userId: policyInfo.userId,
                        lobId: policyInfo.lobId,
                        startDate: policyInfo.startDate,
                        endDate: policyInfo.endDate,
                        agentId: policyInfo.agentId
                    });
                    policyData.save((err, result) => {
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

    getPolicyInfo(toSearchKey, callback) {
        Policy.find(toSearchKey)
            .populate('agentId', 'agentName')
            .populate('lobId', 'categoryName')
            .populate('userId')
            .populate('policyCarrier', 'companyName')
            .populate('accountName', 'accountName')
            .exec((err, data) => {
                if (err) {
                    return callback(err, null);
                } else {
                    return callback(null, data)
                }
            })
    }
}

module.exports = new PolicyModel();