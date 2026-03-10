// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateAvailable: (callback) =>
    ipcRenderer.on("update-available", (_event, info) => callback(info)),
  onUpdateProgress: (callback) =>
    ipcRenderer.on("update-progress", (_event, percent) => callback(percent)),
  onUpdateDownloaded: (callback) =>
    ipcRenderer.on("update-downloaded", (_event, info) => callback(info)),
  checkForUpdates: () => ipcRenderer.send("check-for-updates"),
});
