import express from 'express';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();
import {
  createProxyMiddleware,
  fixRequestBody,
} from 'http-proxy-middleware';

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use(
  createProxyMiddleware('/api', {
    target: process.env.API_ENDPOINT,
    secure: true,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyReq(proxyReq, req, res) {
      console.log("3121")
      // MUST BE THE LAST STEP. BECAUSE IT WILL SEND DATA TO CLIENT
      // IF NOT ON FINAL STEP, WILL RAISE `Error: Cannot set headers after they are sent to the client`
      // GOAL: transform json object back to json string
      fixRequestBody(proxyReq, req, res);
    },
  })
);

app.listen(port, host, () => {
  console.log("//=====", process.env.API_ENDPOINT)
  console.log(`[ ready ] http://${host}:${port}`);
});
