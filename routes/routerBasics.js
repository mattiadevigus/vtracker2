const express = require('express');
const router = express.Router();
const controllerBasics = require('./../controllers/controllerBasics');
const path = require('path');

router
    .post("/", controllerBasics.getHome);

router
    .post("/session/:id", controllerBasics.getSessionTimes);

router
    .post("/session/:id/:driver", controllerBasics.getSessionDetail);

router
    .post("/fullLeaderboard/:track", controllerBasics.getFullLeaderboard);

router
    .post("/login", controllerBasics.checkAdmin);

router
    .post("/serverLeaderboard/:server/:track", controllerBasics.getServerLeaderboard);

router
    .post("/serverDetail/:server/:track/:driver", controllerBasics.getServerDetail);

router
    .post("/serverSettings/:path", controllerBasics.updateServerSettings);

router
    .post("/checkLogin", controllerBasics.checkLogin);

router
    .post("/resetDB", controllerBasics.resetDB);

router
    .post("/editCredentials", controllerBasics.editCredentials);

router
    .post("/editPath", controllerBasics.editPath);

router
    .get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../app_frontend/build/index.html'));
    });


module.exports = router;