<template>
  <div>
    <!-- 触发检查更新的按钮 -->
    <button @click="handleCheckUpdate">检查更新</button>

    <!-- 进度条容器，当 downloading 为 true 时显示 -->
    <div v-if="downloading" class="progress-container">
      <div class="progress-bar-background">
        <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <p>下载中: {{ progress }}% ({{ downloadSpeed }} KB/s)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 定义响应式数据
const downloading = ref(false);
const progress = ref(0);
const downloadSpeed = ref(0);

// 1. 组件挂载后，绑定事件监听器
onMounted(() => {
  // 监听进度更新
  window.electronAPI.onUpdateProgress((data) => {
    downloading.value = true;
    progress.value = data.percent;
    downloadSpeed.value = data.speed;
  });

  // 监听下载完成
  window.electronAPI.onUpdateDownloaded(() => {
    downloading.value = false;
    // 这里可以弹出提示，询问用户是否立即重启安装
    alert("更新下载完成，应用将重启安装！");
    // 调用 quitAndInstall() 逻辑
  });
});

// 2. 检查更新的方法
const handleCheckUpdate = () => {
  window.electronAPI.checkForUpdate();
};
</script>

<style lang="scss" scoped>
.progress-container {
  margin-top: 20px;
}
.progress-bar-background {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.1s;
}
</style>
