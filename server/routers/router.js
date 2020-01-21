const
      express = require('express'),
      router = express.Router(),
      policyController = require('../controller/policy'),
      multer  = require('multer'),
      upload = multer({ dest: './public/uploads/' }),
      scheduleController = require('../controller/schedulerMessage');

 //save policy data to database     
router.post('/upload/policy', upload.single('file'),policyController.upload);

//find policy details for a particular user
router.get('/policy/find/:userName',policyController.findPolicyDetails);

//find policy data for all employees
router.get('/policy/findall',policyController.findPolicyForAll);

//works for format Sat Jan 18 2020 15:59:32 GMT+0530
router.post('/schedule/message', scheduleController.scheduleMessage);

router.get('/restart', function (req, res, next) {
      console.log("hoooo");
      
      process.exit(1);
    });

module.exports = router;