const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");

module.exports = (server) => {
  server.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  server.use(
    "/data",
    createProxyMiddleware({
      target: "https://api.first.org",
      changeOrigin: true,
    })
  );
  server.use(morgan("common"));
};
