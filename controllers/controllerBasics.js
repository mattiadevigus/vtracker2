const pathDb = "./public/tracker.db";
const db = require('./../scripts/modules/database');

exports.getHome = (req, res) => {
    res.send(db.sessionCollections());
}

exports.getSessionTimes = (req, res) => {
    res.send([db.timesCollection(req.params.id), db.sessionDetails(req.params.id)]);
}

exports.getSessionDetail = (req, res) => {
    res.send(db.driverDetail(req.params.id, req.params.driver));
} 