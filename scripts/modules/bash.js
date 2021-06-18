const colors = require('colors/safe');

exports.welcomeMessage = () => {
    console.log(colors.yellow("-------------------------------------"));
    console.log(colors.red("Vtracker beta 1"));
    console.log(colors.magenta("To configure your tracker, open config.json"));
    console.log(colors.yellow("-------------------------------------"));
    console.log(colors.bold("The data below is for debugging purposes and will be removed once development is finished"));
}