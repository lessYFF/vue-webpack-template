import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import Config from '../config/webpack.config.js';

// 指定入口才能热更新
webpackDevServer.addDevServerEntrypoints(Config, Config.devServer);
const complie = webpack(Config);
const server = new webpackDevServer(complie, Config.devServer);

server.listen(8080, 'localhost', ()=> {
    console.log('dev server listening on port 8080');
})