module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8000/",
        ws: true,
        secure: false,
        changeOrigin: true,
        logLevel: "debug"

        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      "^/auth": {
        target: "http://127.0.0.1:8000/",
        ws: true,
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  }
};
