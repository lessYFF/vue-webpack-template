import path from 'path';
import webpack from 'webpack';
import openBrowserPlugin from 'open-browser-webpack-plugin';

// 开发环境配置
const devConfig = {
    mode: 'development',  // webpack4指定模式
    devtool: 'cheap-module-eval-source-map', // 指定source map来增强调试过程
    plugins: [
        new openBrowserPlugin(), // webpack-dev-server devServer.open=true 无效降级方案
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 8080,
        host: 'localhost',
        hot: true,    // 开启HMR
        open: true,   // 运行自动打开浏览器
        inline: true, // 自动刷新模式:inline/iframe
        compress: false, // 开启Gzip压缩
        overlay: { warnings: false, errors: true },
        contentBase: path.join(__dirname, '../dist'), // 将dist目录下的文件，作为可访问文件。
    }
}

export default devConfig;