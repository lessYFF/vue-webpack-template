import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import Config from '../config/webpack.config.js';

const complie = webpack(Config);
const server = new webpackDevServer(complie);

server.listen(8080, 'localhost', ()=> {
    console.log('dev server listening on port 8080');
})