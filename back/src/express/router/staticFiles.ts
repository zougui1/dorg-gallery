import { app, express } from '../../config/server';

// create a build
const build = express.static('/root/gallery-dorg/front/build');

// send the build to any URL
app.use('/', build);
app.use('*', build);
