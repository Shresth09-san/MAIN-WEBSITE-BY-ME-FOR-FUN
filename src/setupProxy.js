const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://production-back.onrender.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
