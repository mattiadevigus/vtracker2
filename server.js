const colors = require('colors/safe');
const app = require('./app');
const config = require('./scripts/modules/config');


const port = config.getAllConfigParameters().port;

app.listen(port, () => {
    console.log(colors.cyan(`Server listening on port ${port}`));
    console.log(colors.yellow("-------------------------------------"));
});