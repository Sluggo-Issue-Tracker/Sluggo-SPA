module.exports = {
  devServer: {
    proxy: {
      "^/sluggo": {
        target: "http://127.0.0.1:80/",
        ws: true,
        secure: false,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
};
