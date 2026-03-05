<template>
  <HelloWorld msg="Vite + Vue" />
  <RouterView />
</template>
<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
const { ipcRenderer } = window.require ? window.require("electron") : {};

onMounted(() => {
  if (!ipcRenderer) return;

  ipcRenderer.on("update-downloaded", (event, info) => {
    // 这里可以弹窗提示用户更新
    if (info.percent) {
      console.log(`下载进度: ${info.percent}%`);
    } else {
      const restart = confirm("新版本已下载，是否立即重启更新？");
      if (restart) {
        ipcRenderer.send("quit-and-install");
      }
    }
  });
});
</script>
<style scoped></style>
