const colors = require('colors/safe');

exports.welcomeMessage = () => {
    console.log(colors.red("-------------------------------------"));
    console.log(colors.bgWhite(colors.red(" Vtracker 2 ")));
    console.log(colors.bgWhite(colors.red("To configure your tracker, open your browser and log in private area")));
    console.log(colors.bgWhite(colors.red("You can overwrite the database with the old times by replacing it in the public folder")));
}