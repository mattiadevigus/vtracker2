const express = require('express');
const router = express.Router();
const controllerBasics = require('./../controllers/controllerBasics');


router
    .get("/", controllerBasics.getHome);

router
    .get("/session/:id", controllerBasics.getSessionTimes);

router
    .get("/session/:id/:driver", controllerBasics.getSessionDetail);

router
    .get("/fullLeaderboard/:track", controllerBasics.getFullLeaderboard);

router 
    .post("/login", controllerBasics.checkAdmin);

module.exports = router;