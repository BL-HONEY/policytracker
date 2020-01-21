var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');
var agentSchema = new mongoose.Schema({
    agentName: {
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
agentSchema.plugin(uniqueValidator);

var Agent = mongoose.model('agent', agentSchema, 'agent');

class AgentModel {

    create(agentInfo, callback) {
        // var searchquery = { $or: [{ "agentName": { $regex: new RegExp("^" + agentInfo + "$", "i") } }] };
        // console.log("agentInfo:", agentInfo);

        Agent.find({agentName:agentInfo}, (err, data) => {
            if (err) {                
                return callback(err);
            } else {
                // console.log("result before: ", data);

                if (data.length > 0) {
                    return callback(null,data[0])
                } else {
                    const agentData = new Agent({
                        agentName: agentInfo
                    });
                    agentData.save((err, result) => {
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

module.exports = new AgentModel();