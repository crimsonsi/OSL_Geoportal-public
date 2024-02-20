const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.0.236:3003',
      changeOrigin: true,
    })
  ),
  app.use(
    '/geoserver/',
    createProxyMiddleware({
      target: 'http://192.168.0.236:8080',
      changeOrigin: true,
    })
  );
};
