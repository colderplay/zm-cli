import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

interface interMeta {
  title: string;
  hidden: boolean; //是否在导航栏显示
  keepAlive: boolean; //是否使用缓存
  role?: string;
}

type AppRouter = RouteRecordRaw & {
  meta: interMeta;
};

const defaultRoutes: AppRouter[] = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
      hidden: true,
      keepAlive: true,
      role: "none", //没有规则
    },
    component: () => import("@/view/home.vue"), // 注意这里要带上 文件后缀.vue
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...defaultRoutes],
})

export default router
