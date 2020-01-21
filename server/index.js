const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    expressValidator = require('express-validator'),
    router = require('./routers/router'),
    mongoose = require('mongoose'),
    Agendash = require('agendash'),
    agenda = require('./services/agenda');

require("dotenv").config();
require('./services/cpucheck');
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api', router);
app.use('/agendash', Agendash(agenda))

const loadEnvBasedConfig = (env) => {
    config = require("./config/"+env);
    startMongo(config.mongo)

    return app.listen(config.PORT, function(){
        console.log("You are connect to %s environment",env);
        console.log("Application is listening to PORT %d ...." , config.PORT);
    })
}

function startMongo(mongoObj){
    mongoose.connect(mongoObj.url,mongoObj.options);

    mongoose.connection.on("connected",()=>{
        console.log("connected to mongodb on %s" ,mongoObj.url);
    })
    mongoose.connection.on("error",(err)=>{
        if(err){
            console.log("not connected to mongodb");
        }
    })
}
module.exports = loadEnvBasedConfig;