import path from 'path';
import webpack from 'webpack';
import parallelUglifyPlugin from 'webpack-parallel-uglify-plugin';
import htmlIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';

const prodConfig = {
    mode: 'production',
    devtool: 'none',
    plugins: [
        /*new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, 'dll', 'vue.manifest.json'))
        }),
        new htmlIncludeAssetsPlugin({
            assets: ['/dll/vue.dll.js'],
            append: false
        }),*/
        new parallelUglifyPlugin({
            workerCount: 4, // 开启几个子进程去并发的执行压缩，默认是当前电脑的cpu数量减1
            uglifyJS: {
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