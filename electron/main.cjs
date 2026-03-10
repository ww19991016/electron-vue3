const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const updater = require("./main/updater"); // 引入更新模块

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // ⛔️ 出于安全考虑，不建议开启 nodeIntegration
      nodeIntegration: false,
      // ⭐️ 推荐使用 preload 脚本进行安全的 API 暴露
      // preload: path.join(__dirname, 'preload.js')
    },
  });

  // 根据环境变量判断是开发模式还是生产模式
  if (process.env.NODE_ENV === "development") {
    // 开发模式：加载本地 Vite 服务
    mainWindow.loadURL("http://localhost:5173"); // Vite 默认端口是 5173
  } else {
    // 生产模式：加载打包后的 index.html 文件
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  // 👇 将窗口实例传递给更新模块
  updater.setMainWindow(mainWindow);

  // 👇 应用就绪后检查更新
  updater.checkForUpdates();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
