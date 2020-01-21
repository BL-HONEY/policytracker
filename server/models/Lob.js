var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');
var lobSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'Lob name is required'],
        unique: true
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

var Lob = mongoose.model('lob', lobSchema, 'lob');

class LobModel {

    create(lobInfo, callback) {
        // var searchquery = { $or: [{ "agentName": { $regex: new RegExp("^" + agentInfo + "$", "i") } }] };
        console.log("agentInfo:", lobInfo);

        Lob.find({categoryName:lobInfo}, (err, data) => {
            if (err) {                
                return callback(err);
            } else {
                // console.log("result before: ", data);

                if (data.length > 0) {
                    return callback(null,data[0])
                } else {
                    const LobData = new Lob({
                        categoryName: lobInfo
                    });
                    LobData.save((err, result) => {
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

module.exports = new LobModel();