var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');
var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'fullName is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: [true, 'phone Number is required'],
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    dob: {
        type: Date,
        required: [true, 'dob is required'],
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

var User = mongoose.model('user', userSchema , 'user');

class PolicyCarrierModel {

    create(userInfo, callback) {
        // var searchquery = { $or: [{ "agentName": { $regex: new RegExp("^" + agentInfo + "$", "i") } }] };
        User.find({email:userInfo.email}, (err, data) => {
            if (err) {
                console.log("errr:", err);
                
                return callback(err);
            } else {
                // console.log("result before: ", data);

                if (data.length > 0) {
                    return callback(null,data[0])
                } else {
                    const userData = new User({
                        fullName: userInfo.fullName,
                        email: userInfo.email,
                        city: userInfo.city,
                        address: userInfo.address,
                        phoneNumber: userInfo.phone,
                        state: userInfo.state,
                        dob: userInfo.dob,
                        zip: userInfo.zip
                    });
                    userData.save((err, result) => {
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
    find(searchquery, callback){
        User.findOne(searchquery, (err, data)=> {
            if(err){
                return callback(err)
            }else{
                return callback(null, data);
            }
        })
    }
}

module.exports = new PolicyCarrierModel();