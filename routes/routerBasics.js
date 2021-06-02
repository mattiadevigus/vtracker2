const express = require('express');
const router = express.Router();
const controllerBasics = require('./../controllers/controllerBasics');


router
    .get("/", controllerBasics.getHome);

router
    .get("/session/:id", controllerBasics.getSessionTimes);

router
    .get("/session/:id/:driver", controllerBasics.getSessionDetail);

module.exports = router;