import {
  createProxyMiddleware,
  fixRequestBody,
} from 'http-proxy-middleware';

const routerApiProxy = () => {
  const router = require('express').Router();

  router.use(
    createProxyMiddleware('/api/', {
      target: process.env.API_ENDPOINT,
      secure: true,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      onProxyReq(proxyReq, req, res) {
        console.log("321132")
        // MUST BE THE LAST STEP. BECAUSE IT WILL SEND DATA TO CLIENT
        // IF NOT ON FINAL STEP, WILL RAISE `Error: Cannot set headers after they are sent to the client`
        // GOAL: transform json object back to json string
        fixRequestBody(proxyReq, req, res);
      },
    })
  );

  return router;
};

export default routerApiProxy;
