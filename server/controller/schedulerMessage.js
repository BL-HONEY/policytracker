const
    scheduleService = require('../services/schedule'),
    customValidator = require('../helpers/customValidation');

class Scheduler {
    scheduleMessage(req, res, next) {
        let dateValidity = customValidator.validateDate(req.body.date)
        console.log("res: ", dateValidity);
        let responseResult = {};
        scheduleService.scheduleJobToSaveToDb(req.body, (err, data) => {
            if(data === true){
                responseResult.status = true;
                responseResult.message = "your message has been successfully scheduled to save"
                res.status(200).send(responseResult)
            }
        })
    }
}

module.exports = new Scheduler();