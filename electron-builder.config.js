// electron-builder.config.js
module.exports = {
  appId: "com.yourcompany.yourapp",
  productName: "AppName",
  directories: {
    output: "dist_electron", // 打包输出目录
  },
  win: {
    target: "nsis",
    icon: "public/icon.ico",
  },
  // 其他配置...
  publish: [
    {
      provider: "generic",
      url: "https://your-update-server.com/releases/",
    },
  ],
};
