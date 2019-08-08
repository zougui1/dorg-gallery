const path = require('path');
const { app, express } = require('../../config/server');

const build = express.static(path.join(__dirname, '/../../../front/build'));

app.use('/', build);
app.use('*', build);
