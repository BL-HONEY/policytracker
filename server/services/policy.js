const
    agentServices = require('../services/agent'),
    async = require("async"),
    policyCarrierServices = require('../services/policyCarrier'),
    lobService = require('../services/lob'),
    userAccountService = require('../services/userAccount'),
    userService = require('../services/user'),
    policyModel = require('../models/policy');


// class PolicyService {
    module.exports.addPolicyDataService = function(policyData, index, callback) {
        async.parallel([
            function (callback) {
                let agentData = policyData.agent
                agentServices.addAgent(agentData, (err, data) => {
                    if (err) {
                        callback(err, null, index)
                    } else {
                        //  console.log("data at 10" , " ", index , data);

                        callback(null, data, index)
                    }
                })
            },
            function (callback) {
                console.log(policyData);

                let policyCarrierData = policyData.company_name;
                policyCarrierServices.addPolicyCarrier(policyCarrierData, (err, data) => {
                    if (err) {
                        callback(err, null, index)
                    } else {
                        console.log("data at 10", " ", index, data);

                        callback(null, data, index)
                    }
                })
            },
            function (callback) {
                let lobData = policyData.category_name
                lobService.addLob(lobData, (err, data) => {
                    if (err) {
                        callback(err, null, index)
                    } else {
                        callback(null, data, index)
                    }
                })
            },
            function (callback) {
                let userAccountData = policyData.account_name
                userAccountService.addUserAccount(userAccountData, (err, data) => {
                    if (err) {
                        callback(err, null, index)
                    } else {
                        callback(null, data, index)
                    }
                })
            },
            function (callback) {
                let userData = {
                    fullName: policyData.firstname,
                    city: policyData.city,
                    phone: policyData.phone,
                    state: policyData.state,
                    zip: policyData.zip,
                    dob: policyData.dob,
                    email: policyData.email,
                    address: policyData.address
                }
                console.log("userData at 72: ", userData);
                
                userService.addUser(userData, (err, data) => {
                    if (err) {
                        callback(err, null, index)
                    } else {
                        callback(null, data, index)
                    }
                })
            }
        ],
            function (err, results) {
                // the results array will equal ['one','two'] even though
                // the second function had a shorter timeout.
                // if (err) {
                //     callback(err)
                // } else {
                //     callback(null, results)
                // }
                // console.log("=========================================================",results[0][0]);
                
                let policyInfo = {
                    policyNumber: policyData.policy_number,
                    premiumAmount: policyData.premium_amount,
                    policyType: policyData.policy_type,
                    agentId: results[0][0]._id,
                    policyCarrier: results[1][0]._id,
                    lobId: results[2][0]._id,
                    accountName: results[3][0]._id,
                    userId: results[4][0]._id,
                    startDate: policyData.policy_start_date,
                    endDate: policyData.policy_end_date
                }
                policyModel.create(policyInfo, (err, data)=> {
                    if (err) {
                            callback(err)
                        } else {
                            callback(null, data)
                        }
                })
            });
    }

  module.exports.findPolicyDetails = (userInfo, callback) => {
        let searchQuery = {userId: userInfo}
        policyModel.getPolicyInfo(searchQuery, (err, data)=> {
            if(err){
                return callback(err)
            }else{                
                return callback(null, data);
            }
        })
    }

 module.exports.findPolicyForAll = (callback) => {
     policyModel.getPolicyInfo({}, (err, data) => {
         if(err){
             callback(err, null);
         }else{
             callback(null, data);
         }
     })
 }
