import os from 'os';
import path from 'path';
import happypackPlugin from 'happypack';
import { VueLoaderPlugin } from 'vue-loader';
import htmlWebpackPlugin from 'html-webpack-plugin';
import cleanWebpackPlugin from 'clean-webpack-plugin';
import openBrowserPlugin from 'open-browser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// 通用路径解析方法
const resolve = function (dir) {
    return path.resolve(__dirname, dir);
}
// 根据系统的内核数量 指定线程池个数
const happyThreadPool = happypackPlugin.ThreadPool({ size: os.cpus().length });

// 通用配置
const baseConfig = {
    output: {  // 构建输出
        publicPath: '/',
        path: resolve('../dist'),
        filename: 'js/[name].js',
    },
    resolve: { // 构建解析
        mainFiles: [ 'index' ],               // 解析目录时默认使用文件
        modules: [ 'src', 'node_modules'],    // 解析模块搜索目录,优化模块查找路径
        extensions: [ '.vue', '.js', '.ts' ], // 自动解析确定的扩展,优化文件查找效率
        alias: {                              // 设置别名,优化文件查找效率
            '@apis': resolve('../src/apis'),
            '@utils': resolve('../src/utils'),
            '@views': resolve('../src/views'),
            '@assets': resolve('../src/assets'),
            '@routes': resolve('../src/routes'),
            '@contants': resolve('../src/contants'),
            '@components': resolve('../src/components'),
            '@directives': resolve('../src/directives'),
        },
    },
    plugins: [  // 插件配置
        new VueLoaderPlugin(),               // vue-loader最新配置
        new openBrowserPlugin(),             // 开发环境devServer.open配置降级方案
        new cleanWebpackPlugin(['dist/*']),  // 清除指定目录内容
        new htmlWebpackPlugin({              // 指定模版或者生成html
            filename: 'index.html',
            template: 'index.html'
        }),
        new BundleAnalyzerPlugin({           // 打包可视化分析
            analyzerMode: 'disabled'
        }),
        new happypackPlugin({                // 构建多线程,基础参数配置
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool,
            verbose: true
        }),
    ],
    module: {   // 模块加载规则配置
        /*noParse: (content) => {
            return /vue|lodash/.test(content)
        },*/
        rules: [
            {    // ts文件加载器
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: resolve('src'),
            }, { // js文件加载器
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel',
                include: resolve('src'),
            },{ // vue文件加载器
                test: /\.vue$/,
                use: 'vue-loader',
            }, { // 图片加载器
                test: /\.(png|jpe?g|gif|svg|mp3|mp4)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: resolve('@assets/images/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    optimization: { // webpack4优化配置
        splitChunks: {
            name: true,                // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，此选项可接收 function
            chunks: "async",           // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载minSize: 0,                // 最小尺寸，默认0
            minChunks: 1,              // 模块被引用 默认1
            minSize: 30000,            // 模块超过30k自动被抽离成公共模块
            maxAsyncRequests: 5,       // 最大异步请求数 默认1
            maxInitialRequests: 3,     // 一个入口并发最大初始化请求数 默认1
            automaticNameDelimiter: '~', // 命名分隔符
            cacheGroups: {                  // 缓存组会继承splitChunks的配置，但是test、priorty和reuseExistingChunk只能用于配置缓存组。
                default: {
                    minChunks: 2,           // 模块被引用>=2次，拆分至vendors公共模块
                    priority: -20,            // 缓存组优先级
                    reuseExistingChunk: true,// 默认使用已有的模块
                },
                vendor: {                   // key 为entry中定义的 入口名称
                    test: /vue|lodash/,   // 正则规则验证，如果符合就提取 chunk
                    name: "vendor",         // 要缓存的 分隔出来的 chunk 名称
                    enforce: true,
                    priority: 1,             // 缓存组优先级 false | object
                }
            }
        }
    },
};

export default baseConfig;
