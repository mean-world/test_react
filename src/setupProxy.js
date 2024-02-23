import { createProxyMiddleware } from 'http-proxy-middleware';
import { checkNamespace } from 'src/api/test';

module.exports = function(app) {
  app.use(
    '/check_namespace',
    createProxyMiddleware({
      target: 'http://127.0.1.1:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/check_namespace': '', // 将 /check_namespace 前缀移除
      },
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
