const policyCarrierModel = require('../models/policyCarrier');

class PolicyCarrierService {
    addPolicyCarrier(policyCarrier, callback) {
        let x = policyCarrier
        // console.log("x=", agent);

        policyCarrierModel.create(x, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }
}

module.exports = new PolicyCarrierService();