const agentModel = require('../models/agent');

class AgentService {
    addAgent(agent, callback) {
let x = agent
// console.log("x=", agent);
      
        agentModel.create(x, (err, result)=> {
            if(err){
                callback(err, null)
            }else{
                callback(null, result)
            }
        })
    }
}

module.exports = new AgentService();