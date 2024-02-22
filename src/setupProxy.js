const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'http://backend-svc.website-system:5000', //注意沒有api在這裡
      changeOrigin: true,
    })
  );
};