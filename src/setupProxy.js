import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
    app.use(
        '/check_namespace',
      createProxyMiddleware({
        target: 'http://backend-svc.website-system:5000',
        changeOrigin: true,
        onProxyReq: (proxyReq, req) => {
          if (req.method === 'GET' && req.query.username) {
            const username = req.query.username;
            const query = new URLSearchParams({ username }).toString();
            proxyReq.path += `?${query}`;
          }
        },
      })
    );
  };