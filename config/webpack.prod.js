import path from 'path';
import webpack from 'webpack';
import nodemonPlugin from 'nodemon-webpack-plugin';
import copyWebpackPlugin from 'copy-webpack-plugin';
import miniCssExtractPlugin from "mini-css-extract-plugin";
import webpackParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';
import htmlIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';

// 生产环境配置
const prodConfig = {
    mode: 'production', // webpack4指定模式
    devtool: 'none',    // 指定source map来增强调试过程
    module: {
        rules: [
            {   // css文件加载器
                test: /\.css$/,
                use: [ miniCssExtractPlugin.loader, 'css-loader']
            },
        ]
    },
    plugins: [
        // new nodemonPlugin(), // 生产环境自动重启服务
        /*new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, 'dll', 'vue.manifest.json'))
        }),
        new htmlIncludeAssetsPlugin({
            assets: ['/dll/vue.dll.js'],
            append: false
        }),*/
        new miniCssExtractPlugin({          // 提取css文件
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new copyWebpackPlugin([{            // 打包输出静态资源
            from: path.resolve(__dirname, '../src/assets'),
            to: path.resolve(__dirname, '../dist/assets'),
            toType: 'dir'
        }]),
        new webpackParallelUglifyPlugin({
            workerCount: 4, // 开启几个子进程去并发的执行压缩，默认是当前电脑的cpu数量减1
            uglifyES: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: true // 保留注释
                },
                compress: {
                    warnings: false, // Uglifyjs 删除没有代码时，不输出警告
                    drop_console: true, // 删除所有console语句
                    collapse_vars: true,
                    reduce_vars: true
                }
            }
        }),
    ],
};

export default prodConfig;