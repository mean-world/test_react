const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
//   app.use(
//     '/api', 
//     createProxyMiddleware({
//       target: 'http://backend-svc.website-system:5000', //注意沒有api在這裡
//       changeOrigin: true,
//     })
//   );

app.use((req, res) => {
    // 允許所有的來源
    res.append('Access-Control-Allow-Origin', '*')
    res.json({ status: 'success', message: 'ok' })
  })
};