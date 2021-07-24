const colors = require('colors/safe');

exports.welcomeMessage = () => {
    console.log(colors.yellow("-------------------------------------"));
    console.log(colors.red("Vtracker 2"));
    console.log(colors.magenta("To configure your tracker, open config.json"));
}