<template>
  <div class="">
    <el-button @click="toLogin">login</el-button>
    <el-button type="primary">更新3.0</el-button>
    <el-button type="success">Success</el-button>
    <div>
      <el-checkbox v-model="checked1" label="Option 1" size="large" />
      <el-checkbox v-model="checked2" label="Option 2" size="large" />
    </div>
    <div class="my-2">
      <el-checkbox v-model="checked3" label="Option 1" />
      <el-checkbox v-model="checked4" label="Option 2" />
    </div>
    <div class="mt-2">
      <el-checkbox v-model="checked5" label="Option 1" size="small" />
      <el-checkbox v-model="checked6" label="Option 2" size="small" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from "vue";
import router from "../router";
const props = defineProps([""]);
const emit = defineEmits([""]);
const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(false);
const checked5 = ref(false);
const checked6 = ref(false);
const toLogin = () => {
  router.push("/login");
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
