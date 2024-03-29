const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/test', {
            target: 'http://127.0.0.1:3000/',
            changeOrigin: true,
            pathRewrite: { '^/test': '' }
        }),
    )
};
