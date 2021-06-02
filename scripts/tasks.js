const colors = require('colors/safe');
const results = require('./modules/results');
const timeParse = require('./modules/time');
const database = require('./modules/database');

exports.startup = () => {
    // retrieve data from json
    const arr = results.getAllJsonFiles("C:\\Users\\matti\\Desktop\\Scottish Gaming League Server\\results");
    const arrDates = results.getAllJsonDataCreation("C:\\Users\\matti\\Desktop\\Scottish Gaming League Server\\results");

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


}
