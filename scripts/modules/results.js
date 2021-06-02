const fs = require('fs');

exports.getAllJsonFiles = (filespath) => {
    let arr = [];
    if (fs.existsSync(filespath)) {
        console.log("esiste");
        let files = fs.readdirSync(filespath);
        files.forEach(file => {
            arr.push(this.getJsonFile(filespath + "\\" + file));
        });
    }

    return arr;
}

exports.getJsonFile = (filename) => {
    let data;
    data = fs.readFileSync(filename).toString();
    data = this.removeEscape(data);

    return data;
}

exports.getAllJsonDataCreation = (filespath) => {
    let dates = [];
    if (fs.existsSync(filespath)) {
        let files = fs.readdirSync(filespath);
        files.forEach(file => {
            let dateCreation = fs.statSync((filespath + "\\" + file));
            dates.push(dateCreation["birthtime"]);
        })
    }

    return dates;
}

exports.getDataFile = (filespath) => {
    let data = fs.stat(filespath, (err, stat) => {
        return stat.mtime;
    })

    return data;
}

exports.getServerName = (arr) => {
    return arr["serverName"];
}

exports.getSessionType = (arr) => {
    return arr["sessionType"];
}

exports.getTrackName = (arr) => {
    return arr["trackName"];
}

exports.getBestLap = (arr) => {
    return arr["sessionResult"].bestlap;
}

exports.getWeather = (arr) => {
    return arr["sessionResult"].isWetSession;
}

exports.getFullLeaderBoard = (arr) => {
    return arr["sessionResult"].leaderBoardLines;
}

exports.getAllLapsFromDriver = (arr, id) => {
    let times = [];
    let i = 0;

    while (arr.laps[i] != undefined) {
        if (arr.laps[i].carId === id && arr.laps[i].isValidForBest === true) times.push(arr.laps[i].splits);
        i++;
    }

    return times;
}

exports.removeEscape = (string) => {
    string = string.replace(/[\u0000-\u0019]+/g, "");

    return JSON.parse(string);
}