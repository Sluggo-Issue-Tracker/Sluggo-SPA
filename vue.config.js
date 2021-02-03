module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8000/",
        ws: true,
        secure: false,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      "^/auth": {
        target: "http://localhost:8000/",
        ws: true,
        secure: false,
        changeOrigin: true
      }
    }
  }
};
