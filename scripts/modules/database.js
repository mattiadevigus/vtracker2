const pathDb = "./public/tracker.db";
const timeParse = require('./time');
const sqlite = require('better-sqlite3');

exports.createSession = (server, track, weatherValue, sessionType, dataCreation) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`INSERT OR IGNORE INTO Sessions VALUES(NULL, ?, ?, ?, ?, ?)`);
    stmt.run(server, track, weatherValue, sessionType, dataCreation.toString());

    stmt = db.prepare(`SELECT ses_id FROM Sessions WHERE ses_creation = ?`);
    let lastId = stmt.get(dataCreation.toString());

    db.close();

    return lastId["ses_id"];
};

exports.insertTime = (driverName, carModel, time, lastId) => {
    const db = new sqlite(pathDb);

    stmt = db.prepare(`INSERT OR IGNORE INTO Times VALUES(NULL, ?, ?, ?, ?, ?, ?)`);
    stmt.run(driverName, carModel, timeParse.getSeconds(time[0]), timeParse.getSeconds(time[1]), timeParse.getSeconds(time[2]), lastId);

    db.close();
};

exports.serverCollections = () => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT * FROM Sessions INNER JOIN Tracks ON ses_track = tra_nameCode INNER JOIN Times on tim_sessionId = ses_id GROUP BY ses_serverName, ses_track, ses_weather ORDER BY ses_weather ASC`);
    let servers = stmt.all();

    db.close();
    return servers;
}

exports.sessionCollections = () => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT * FROM Sessions INNER JOIN Tracks ON ses_track = tra_nameCode INNER JOIN Times ON tim_sessionId = ses_id GROUP BY  ses_id`);
    let sessions = stmt.all();

    db.close();
    return sessions;
}

exports.timesCollection = (sessionId) => {
    const db = new sqlite(pathDb);
    let stmt = db.prepare(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_id = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC `);
    let times = stmt.all(sessionId);

    db.close();
    return times;
}

exports.sessionDetails = (sessionId) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT ses_serverName, ses_weather FROM Sessions WHERE ses_id = ?`);
    let serverInfo = stmt.get(sessionId);

    stmt = db.prepare(`SELECT count(tim_driverName) as tim_driverCount FROM (SELECT tim_driverName FROM Times WHERE tim_sessionId = ? GROUP BY tim_driverName);`);
    let driverCount = stmt.get(sessionId);

    stmt = db.prepare(`SELECT tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree, sum(tim_sectorOne + tim_sectorTwo+ tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions on tim_sessionId = ses_id WHERE ses_id = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC LIMIT 1`);
    let bestTime = stmt.get(sessionId);

    stmt = db.prepare(`SELECT min(tim_sectorOne) as bestSectorOne, min(tim_sectorTwo) as bestSectorTwo, min(tim_sectorTree) as bestSectorTree FROM (SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_id = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC)`);
    let bestSectors = stmt.get(sessionId);

    db.close();

    return [serverInfo, driverCount, bestTime, bestSectors];
}

exports.driverDetail = (sessionId, driverName) => {
    const db = new sqlite(pathDb/* , { verbose: console.log } */);

    let stmt = db.prepare(`SELECT * FROM (SELECT tim_sectorOne, tim_sectorTwo, tim_sectorTree, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_id = ? AND tim_driverName = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree);`);
    let times = stmt.all(sessionId, driverName);

    stmt = db.prepare(`SELECT * FROM (SELECT tra_km, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId INNER JOIN Tracks ON ses_track = tra_nameCode WHERE ses_id = ? AND tim_driverName = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC LIMIT 1) ORDER BY tim_totalTime ASC`);
    let avgSpeed = (timeParse.getAvg(stmt.get(sessionId, driverName))).toFixed(3);

    stmt = db.prepare(`SELECT * FROM (SELECT sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_id = ?  GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree)ORDER BY tim_totalTime ASC LIMIT 1;`);
    let bestTime = stmt.get(sessionId);

    stmt = db.prepare(`SELECT * FROM (SELECT sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_id = ? AND tim_driverName = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree)ORDER BY tim_totalTime ASC LIMIT 1;`);
    let bestDriverTime = stmt.get(sessionId, driverName);

    console.log(bestDriverTime);

    db.close();

    return [times, avgSpeed, bestTime.tim_totalTime, bestDriverTime.tim_totalTime];
}

exports.getAllTracks = () => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT tra_name, tra_nameCode, tra_flag, tra_track FROM Sessions INNER JOIN Tracks ON ses_track = tra_nameCode INNER JOIN Times ON tim_sessionId = ses_id GROUP BY tra_name`);
    let tracks = stmt.all();

    db.close();

    return tracks;
}

exports.fullLeaderboard = (track) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_track = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC;`);
    let times = stmt.all(track);

    stmt = db.prepare(`SELECT * FROM (SELECT sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_track = ?  GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree)ORDER BY tim_totalTime ASC LIMIT 1;`)
    let bestTime = stmt.get(track);

    stmt = db.prepare(`SELECT count(tim_driverName) as tim_driverCount FROM (SELECT tim_driverName FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_track = ? GROUP BY tim_driverName);`);
    let driverCount = stmt.get(track);

    stmt = db.prepare(`SELECT min(tim_sectorOne) as bestSectorOne, min(tim_sectorTwo) as bestSectorTwo, min(tim_sectorTree) as bestSectorTree FROM (SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_track = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC);`);
    let bestSectors = stmt.get(track);

    stmt = db.prepare(`SELECT * FROM Tracks WHERE tra_nameCode = ?;`);
    let trackInfo = stmt.get(track);

    db.close();
    
    return [times, bestTime, driverCount, bestSectors, trackInfo];
}

exports.serverLeaderboard = (server, track) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Cars on tim_carModel = car_id INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_serverName = ? AND ses_track = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC;`);
    let times = stmt.all(server, track);

    stmt = db.prepare(`SELECT * FROM (SELECT sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_serverName = ? AND ses_track = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree)ORDER BY tim_totalTime ASC LIMIT 1;`);
    let bestTime = stmt.get(server, track);

    stmt = db.prepare(`SELECT count(tim_driverName) as tim_driverCount FROM (SELECT tim_driverName FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_serverName = ? AND ses_track = ? GROUP BY tim_driverName);`);
    let driverCount = stmt.get(server, track);

    stmt = db.prepare(`SELECT min(tim_sectorOne) as bestSectorOne, min(tim_sectorTwo) as bestSectorTwo, min(tim_sectorTree) as bestSectorTree FROM (SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_serverName = ? AND ses_track = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC);`);
    let bestSectors = stmt.get(server, track);

    stmt = db.prepare(`SELECT * FROM Tracks WHERE tra_nameCode = ?;`);
    let trackInfo = stmt.get(track);

    db.close();

    return[times, bestTime, driverCount, bestSectors, trackInfo];
}

exports.serverDetail = (server, track, driverName) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Cars on tim_carModel = car_id INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_serverName = ? AND ses_track = ? AND tim_driverName = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC;`);
    let bestDriverTime = stmt.get(server, track, driverName);

    stmt = db.prepare(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Cars on tim_carModel = car_id INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_serverName = ? AND ses_track = ? GROUP BY tim_driverName, tim_sectorOne, tim_sectorTwo, tim_sectorTree ORDER BY tim_totalTime ASC) GROUP BY tim_driverName ORDER BY tim_totalTime ASC;`);
    let bestDriver = stmt.get(server, track);

    return [bestDriverTime];
}