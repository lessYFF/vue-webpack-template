import merge from 'webpack-merge';
import baseConfig from './webpack.base.js';
import devConfig from './webpack.dev.js';
import prodConfig from './webpack.prod.js';

const envConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
const Config = merge(baseConfig, envConfig);

export default Config;