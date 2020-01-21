const
    userModel = require('../models/user'),
    async = require('async'),
    policyService = require('../services/policy');

class UserService {
    addUser(agent, callback) {
        let x = agent
        // console.log("x=", agent);

        userModel.create(x, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }

    findUser(userInfo, callback) {
        async.waterfall([
            function (cb) {
                let searchQuery = { fullName: userInfo.fullName }
                userModel.find(searchQuery, (err, data) => {
                    if (err) {
                        cb(err, null)
                    } else {
                        cb(null, data)
                    }
                })

            },
            function (args1, cb) {
                let userInfo = args1;
                console.log("here=================", userInfo._id);

                policyService.findPolicyDetails(userInfo._id, (err, data) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, data)
                    }
                })
            }
        ], function (err, result) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }

        })
    }
}

module.exports = new UserService();