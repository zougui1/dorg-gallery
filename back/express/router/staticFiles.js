const path = require('path');
const { app, express } = require('../../config/server');

// send the build for any URL
const build = express.static(path.join(__dirname, '/../../../front/build'));

app.use('/', build);
app.use('*', build);
