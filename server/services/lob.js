const lobModel = require('../models/Lob');

class LobService {
    addLob(lobInfo, callback) {
        let x = lobInfo
        lobModel.create(x, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }
}

module.exports = new LobService();