var
    agenda = require('./agenda'),
    messageModel = require('../models/message');
module.exports.scheduleJobToSaveToDb = async (body, callback) => {
    agenda.define("schedule" + body.date, { priority: 'high', concurrency: 10 }, async job => {
        const dataToSave = job.attrs.data;
        messageModel.create(dataToSave, (err, databaseResponse) => {
            if (err) {
                console.log("err", err);
            } else {
                console.log("data: ", databaseResponse);
            }
        })
    });
    (async function () {
        await agenda.start();
        agenda.schedule(body.date, "schedule" + body.date, body.data);
    })();
    callback(null, true);
}

