// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // 暴露检查更新的方法
  checkForUpdate: () => ipcRenderer.send("check-for-update"),

  // 暴露进度相关的事件监听器
  onUpdateProgress: (callback) =>
    ipcRenderer.on("update-progress", (_event, data) => callback(data)),

  // 暴露下载完成的事件监听器
  onUpdateDownloaded: (callback) =>
    ipcRenderer.on("update-downloaded", callback),
});
