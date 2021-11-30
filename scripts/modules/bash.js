const colors = require('colors/safe');

exports.welcomeMessage = () => {
    console.log(colors.red("-------------------------------------"));
    console.log(colors.bgWhite(colors.red("Vtracker 2 ")));
    console.log(colors.bgWhite(colors.red("To configure your tracker, open your browser and log in private area")));
    console.log(colors.bgWhite(colors.red("JSONS's must contain '_FP' or '_Q', or '_R' in name to be read")));
}