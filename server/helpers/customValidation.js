const moment = require('moment');

module.exports.validateDate = (date) => {
    var formats = [
        moment.ISO_8601,
        "MM/DD/YYYY  :)  HH*mm*ss"
    ];
    return moment(
        date, formats, true).isValid();

}