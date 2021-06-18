const express = require('express');
const cors = require('cors');
const routerBasics = require('./routes/routerBasics');
const tasks = require('./scripts/tasks');
const bash = require('./scripts/modules/bash');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use("/", routerBasics);

bash.welcomeMessage();
tasks.startup();

module.exports = app;