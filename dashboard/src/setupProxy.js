const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // Proxy to local server
    app.use(
        '/api/local',  // This path prefix is used for local server requests
        createProxyMiddleware({
            target: 'http://localhost:5000',  // Local server endpoint
            changeOrigin: true,
            pathRewrite: {
                '^/api/local': '', // Strips '/api/local' prefix when proxying the request to localhost
            },
        })
    );

    app.use(
        '/api/remote',  // On-prem server proxy path
        createProxyMiddleware({
            target: 'http://node102.qa.adsystems.sj2.cj.com:11581',  // On-premise server URL
            changeOrigin: true,
            pathRewrite: {
                '^/api/remote': '', // Strip out '/api/remote' before the request hits your on-prem server
            },
        })
    );
};
