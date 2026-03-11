import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Index from "../views/index.vue";

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/update",
    name: "Update",
    component: () => import("../views/update.vue"),
  },
];

// const router = createRouter({
//   history: createWebHistory(), // 使用HTML5 History模式

//   // history: createWebHistory(process.env.BASE_URL), // 使用HTML5 History模式
//   routes, // `routes: routes` 的缩写
// });
const router = createRouter({
  // 👇 使用 createWebHashHistory
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
