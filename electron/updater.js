// main/updater.js
const { autoUpdater } = require("electron-updater");
const { dialog, BrowserWindow } = require("electron");
const log = require("electron-log");

// 设置主窗口引用，用于发送消息
let mainWindow = null;
module.exports.setMainWindow = (window) => {
  mainWindow = window;
};

// 配置日志
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

// 关闭自动下载，以便我们手动控制进度条显示
autoUpdater.autoDownload = false;

// 1. 检查更新
exports.checkForUpdates = () => {
  autoUpdater.checkForUpdatesAndNotify();
  // 或者分步控制：autoUpdater.checkForUpdates();
};

// 2. 监听事件
autoUpdater.on("update-available", (info) => {
  log.info("发现新版本:", info.version);
  mainWindow.webContents.send("update-available", info);

  // 也可以弹窗询问用户
  dialog
    .showMessageBox(mainWindow, {
      type: "info",
      title: "发现更新",
      message: `发现新版本 v${info.version}，是否现在下载？`,
      buttons: ["是", "否"],
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
});

autoUpdater.on("update-not-available", (info) => {
  log.info("当前已是最新版本");
  mainWindow.webContents.send("update-not-available", info);
});

autoUpdater.on("download-progress", (progressObj) => {
  log.info(`下载进度: ${progressObj.percent}%`);
  mainWindow.webContents.send("update-progress", progressObj.percent);
});

autoUpdater.on("update-downloaded", (info) => {
  log.info("更新下载完成，准备安装");
  mainWindow.webContents.send("update-downloaded", info);

  // 弹窗提示用户安装
  dialog
    .showMessageBox(mainWindow, {
      type: "info",
      title: "更新就绪",
      message: `新版本已下载完成，是否立即重启应用？`,
      buttons: ["是", "否"],
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});

autoUpdater.on("error", (err) => {
  log.error("更新错误:", err);
  mainWindow.webContents.send("update-error", err.message);
});
