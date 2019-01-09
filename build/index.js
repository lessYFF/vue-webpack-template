require('@babel/register');

const isProd = process.env.NODE_ENV === 'production';
isProd ? require('./prod-server.js') : require('./dev-server.js');
