const express = require('express');
const cors = require('cors');
const routerBasics = require('./routes/routerBasics');
const tasks = require('./scripts/tasks');

const app = express();

app.use(cors());
app.use("/", routerBasics);

tasks.startup();

module.exports = app;