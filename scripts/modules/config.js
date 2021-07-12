const fs = require('fs');

exports.getAllConfigParameters = () => {
    return JSON.parse(fs.readFileSync("config.json"));
}

exports.writeConfigFile = (object) => {
    fs.writeFileSync("config.json", JSON.stringify(object));
}
