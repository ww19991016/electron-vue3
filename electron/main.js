// 在 electron/main.js 顶部引入
const { autoUpdater } = require("electron-updater");
const log = require("electron-log"); // 推荐引入日志库用于调试更新过程
// electron/main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// 配置日志
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

// 更新检查函数
function handleUpdater(mainWindow) {
  // 1. 检查更新
  autoUpdater.checkForUpdatesAndNotify();

  // 2. 监听下载进度
  autoUpdater.on("download-progress", (progressObj) => {
    // 将进度发送给渲染进程 (Vue 页面)
    mainWindow.webContents.send("update-downloaded", {
      percent: progressObj.percent,
      speed: progressObj.bytesPerSecond,
    });
  });

  // 3. 监听下载完成
  autoUpdater.on("update-downloaded", () => {
    // 询问用户是否立即重启安装
    mainWindow.webContents.send("update-downloaded", {});
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // 生产环境建议关闭 nodeIntegration，使用 preload 隔离
      nodeIntegration: false,
      contextIsolation: true,
      // 如果需要调用 Node API，配置 preload
      // preload: path.join(__dirname, 'preload.js')
    },
  });

  // 根据环境加载页面
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173"); // Vite 默认端口
    mainWindow.webContents.openDevTools(); // 开发时打开调试
  } else {
    // 加载打包后的 HTML 文件
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  // 👇 调用更新逻辑
  handleUpdater(mainWindow);
  return mainWindow;
}

app.whenReady().then(() => {
  createWindow();

  // macOS 点击 Dock 图标重新打开窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Windows/Linux 关闭所有窗口时退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
