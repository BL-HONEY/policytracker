const userAccountModel = require('../models/userAccount');

class UserAccountService {
    addUserAccount(userAccountInfo, callback) {
        let x = userAccountInfo
        console.log("x=", x);

        userAccountModel.create(x, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }
}

module.exports = new UserAccountService();