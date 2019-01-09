import path from 'path';
import webpack from 'webpack';

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 8080,
        host: 'localhost',
        hot: true,  // 开启HMR
        open: true, // 运行了自动打开浏览器
        inline: false, // 在打包后文件里注入一个websocket客户端
        compress: false, // 开启Gzip压缩
        overlay: { warnings: false, errors: true },
        contentBase: path.join(__dirname, '../dist'), // 将 dist 目录下的文件，作为可访问文件。
    }
}

export default devConfig;