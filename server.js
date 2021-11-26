const colors = require('colors/safe');
const app = require('./app');
const config = require('./scripts/modules/config');

const port = config.getAllConfigParameters().port;

app.listen(port, () => {
    console.log(colors.bgWhite(colors.red(`Server listening on port ${port}`)));
    console.log(colors.red("-------------------------------------"));
});