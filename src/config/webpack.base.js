import path from 'path';
import webpack from 'webpack';
import cleanWebpackPlugin from 'clean-webpack-plugin';

baseConfig = {
    mode: 'development',
    devtool: '#source-map',
    resolve: {
        extensions: [ '.js', '.json', '.ts', '.tsx' ],
        alias: {
            utils: path.resolve(__dirname, 'src/utils'),
            config: path.resolve(__dirname, 'src/config'),
        }
    },
    plugins: [
        new cleanWebpackPlugin(['dist'], '/'),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                query: {
                    compact: true,
                    cacheDirectory: true
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    }
};

export default baseConfig;
