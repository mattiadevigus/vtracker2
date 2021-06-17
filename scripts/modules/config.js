const fs = require('fs');

exports.getAllConfigParameters = () => {
    return JSON.parse(fs.readFileSync("config.json"));
}

