const app = require('./app');
const config = require('./scripts/modules/config');

const port = config.getAllConfigParameters().port;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});