
const
    Excel = require('exceljs'),
    policyService = require('../services/policy'),
    async = require("async"),
    userService = require('../services/user');

class PolicyController {

    upload(req, res, next) {
        let responseResult = {};
        if (req.file != null && req.file.originalname != null && req.file.originalname != ""
            && (req.file.originalname.indexOf('.xlsx') !== -1 || req.file.originalname.indexOf('.xls') !== -1
                || req.file.originalname.indexOf('.csv') !== -1 || req.file.originalname.indexOf('.csv') !== -1)) {
            // console.log("req file 6: ", req.file.path);

            var ExcelDataArray = [];
            var inboundWorkbook = new Excel.Workbook();

            inboundWorkbook.csv.readFile(req.file.path)
                .then(() => {
                    var inboundWorksheet = inboundWorkbook.getWorksheet(1);
                    inboundWorksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
                        if (rowNumber > 1) {
                            var newExcelDatadump = {};
                            for (var i = 1; i < row.values.length; i++) {
                                if (inboundWorksheet.getRow(1).values[i] == "agent") {
                                    newExcelDatadump.agent = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "policy_number") {
                                    newExcelDatadump.policy_number = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "company_name") {
                                    newExcelDatadump.policy_carrier = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "category_name") {
                                    newExcelDatadump.category_name = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "policy_start_date") {
                                    newExcelDatadump.policy_start_date = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "policy_end_date") {
                                    newExcelDatadump.policy_end_date = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "account_name") {
                                    newExcelDatadump.account_name = row.values[i];
                                }


                                if (inboundWorksheet.getRow(1).values[i] == "email") {
                                    newExcelDatadump.email = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "firstname") {
                                    newExcelDatadump.firstname = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "city") {
                                    newExcelDatadump.city = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "phone") {
                                    newExcelDatadump.phone = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "address") {
                                    newExcelDatadump.address = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "state") {
                                    newExcelDatadump.state = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "zip") {
                                    newExcelDatadump.zip = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "dob") {
                                    newExcelDatadump.dob = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "company_name") {
                                    newExcelDatadump.company_name = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "premium_amount") {
                                    newExcelDatadump.premium_amount = row.values[i];
                                }
                                if (inboundWorksheet.getRow(1).values[i] == "policy_type") {
                                    newExcelDatadump.policy_type = row.values[i];
                                }
                            }
                            ExcelDataArray.push(newExcelDatadump);
                        }
                    });
                    if (ExcelDataArray != null && ExcelDataArray.length > 0) {
                        var operations = [];
                        var responseArray = [];

                        for (var i = 0; i < ExcelDataArray.length; i++) {
                            let newExcelData = ExcelDataArray[i];

                            operations.push((function (newExcelData) {
                                return function (cb) {
                                    policyService.addPolicyDataService(newExcelData, i, (err, result, index) => {
                                        if (err) {
                                            // console.log(err)
                                            var errorString = '';
                                            if (err.name === 'MongoError' && err.code === 11000) {
                                                errorString = err.message;
                                            }
                                            else {
                                                errorString = err;
                                            }
                                            responseArray.push({ "rowNumber": index, "error": "1", "data": errorString });
                                            cb({ "rowNumber": index, "error": "1", "data": errorString });
                                        } else {
                                            // console.log(err)
                                            responseArray.push({ "rowNumber": index, "error": "0", "data": result });
                                            cb(null, { "rowNumber": index, "error": "0", "data": result });
                                        }
                                    });
                                }
                            })(newExcelData))
                        }
                        async.series(operations, (errorAsync, resultAsync) => {
                            if (errorAsync) {
                                responseResult.status = true;
                                responseResult.message = "";
                                responseResult.data = responseArray;
                                return res.status(200).send(errorAsync);
                            } else {
                                responseResult.status = true;
                                responseResult.message = "";
                                responseResult.data = responseArray;
                                return res.status(200).send(resultAsync);

                            }
                        })
                    } else {
                        responseResult.status = false;
                        responseResult.message = "please provide valid policy data format";
                        res.status(400).send(responseResult);
                    }
                });

        } else {
            responseResult.status = false;
            responseResult.message = "please provide valid file";
            res.status(400).send(responseResult);
        }



    }
    findPolicyDetails(req, res, next) {
        let filteredObject = {
            fullName: req.params.userName
        }        
        let responseResult = {};
        userService.findUser(filteredObject, (err, policyData) => {
            if (err) {
                responseResult.status = false;
                responseResult.errMessage = err;
                res.status(400).send(responseResult);
            }else{
                if(policyData)
                responseResult.status = true;
                responseResult.message = "User policy details found";
                responseResult.data = policyData;
                res.status(200).send(responseResult);
            }
        })
    }
    findPolicyForAll(req, res, next){
        let responseResult = {};
        policyService.findPolicyForAll((err, policyData)=> {
            if(err){
                responseResult.status = false;
                responseResult.errMessage = err;
                res.status(400).send(responseResult);
            }else{
                responseResult.status = true;
                responseResult.message = "All Users policy details";
                responseResult.data = policyData;
                res.status(200).send(responseResult); 
            }
        })
    }
}

module.exports = new PolicyController