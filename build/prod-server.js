/***** webpack-dev-middleware 构建输出在内存 *****/
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import Config from '../config/index.js';

const app = express();
const complie = webpack(Config);

app.use(webpackDevMiddleware(complie, {
    publicPath: Config.output.publicPath,
}));

// server the files on port 8080
app.listen(8080, function(){
    console.log('Example app listening on port 8080!\n');
});
