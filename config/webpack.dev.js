import path from 'path';
import webpack from 'webpack';

// 开发环境配置
const devConfig = {
    mode: 'development',  // webpack4指定模式
    devtool: 'cheap-module-eval-source-map', // 指定source map来增强调试过程
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {   // css文件加载器
                test: /\.css$/,
                use: [ 'vue-style-loader', 'css-loader']
            },
        ]
    },
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