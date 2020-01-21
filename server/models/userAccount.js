var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');
var userAccountSchema = new mongoose.Schema({
    accountName: {
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

var UserAccount = mongoose.model('userAccount', userAccountSchema, 'userAccount');

class UserAccountModel {

    create(userAccountInfo, callback) {
        // var searchquery = { $or: [{ "agentName": { $regex: new RegExp("^" + agentInfo + "$", "i") } }] };
        // console.log("agentInfo:", agentInfo);

        UserAccount.find({companyName:userAccountInfo}, (err, data) => {
            if (err) {
                console.log("errr:", err);
                
                return callback(err);
            } else {
                // console.log("result before: ", data);

                if (data.length > 0) {
                    return callback(null,data[0])
                } else {
                    const userAccountData = new UserAccount({
                        accountName: userAccountInfo.trim()
                    });
                    userAccountData.save((err, result) => {
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

module.exports = new UserAccountModel();