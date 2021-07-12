const pathDb = "./public/tracker.db";
const db = require('./../scripts/modules/database');
const config = require('./../scripts/modules/config');

exports.getHome = (req, res) => {
    res.send({ servers: db.serverCollections(), sessions: db.sessionCollections(), tracks: db.getAllTracks() });
}

exports.getSessionTimes = (req, res) => {
    res.send([db.timesCollection(req.params.id), db.sessionDetails(req.params.id)]);
}

exports.getSessionDetail = (req, res) => {
    res.send(db.driverDetail(req.params.id, req.params.driver));
}

exports.getFullLeaderboard = (req, res) => {
    res.send(db.fullLeaderboard(req.params.track));
}

exports.checkAdmin = (req, res) => {
    console.log(req.body);
    const parameters = config.getAllConfigParameters();
    if (parameters.user === req.body.username && parameters.password === req.body.password) {
        res.send(true);
    } else {
        res.send(false);
    }
}

exports.getServerLeaderboard = (req, res) => {
    res.send(db.serverLeaderboard(req.params.server, req.params.track));
}

exports.getServerDetail = (req, res) => {
    res.send(db.serverDetail(req.params.server, req.params.track, req.params.driver));
}

exports.updateServerSettings = (req, res) => {
    const path = req.params.path;
    let parameters = config.getAllConfigParameters();
    parameters.resPath = path;
    config.writeConfigFile(parameters);
    res.send(true);
}