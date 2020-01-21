var mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'message is required'],
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

var Message = mongoose.model('message', messageSchema, 'message');

class MessageModel {

    create(data, callback) {
        const message = new Message({
            message: data
        });
        message.save((err, result) => {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })
    }
}


module.exports = new MessageModel();