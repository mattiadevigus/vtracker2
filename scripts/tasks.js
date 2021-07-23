const opener = require('opener');
const results = require('./modules/results');
const timeParse = require('./modules/time');
const database = require('./modules/database');
const bash = require('./modules/bash');
const config = require('./modules/config');


exports.startup = async () => {
    console.log("Updating...");

    const configParameters = config.getAllConfigParameters();
    const arr = results.getAllJsonFiles(configParameters.resPath);
    const arrDates = results.getAllJsonDataCreation(configParameters.resPath);

    let j = 0;

    for(let session of arr) {
        let idSession = database.createSession(results.getServerName(session), results.getTrackName(session), results.getWeather(session), results.getSessionType(session), arrDates[j]);
        let leaderboards = results.getFullLeaderBoard(session);
        
        for(let driver of leaderboards) {
            let times = results.getAllLapsFromDriver(session, driver.car["carId"]);
            for(let time of times) {
                database.insertTime((driver.currentDriver["firstName"] + " " + driver.currentDriver["lastName"]), driver.car["carModel"], time, idSession);
            }
        }

        j++;
    }

    console.log("Done...");

    setTimeout(this.startup, config.getAllConfigParameters().updateTime);
}

exports.openOnStart = () => {
    const configParameters = config.getAllConfigParameters();
    if(configParameters.openOnStart === true) opener(`http://localhost:${configParameters.port}`);
}
