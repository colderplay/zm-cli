import { clear } from "console"
import { defineStore } from "pinia"
import { getAuth } from "../request/api"

export const useMainStore = defineStore({
  id: "perssion",
  state: () => ({
    userPerssion: [],
    menuPerssion: [],
  }),
  actions: {
    resetPerssion(menu: [], user: []) {
      this.userPerssion = user;
      this.menuPerssion = menu;
    },
    async getAuth(appCode: string) {
      const res = await getAuth({
        appCode,
      });
      if (res.data) {
        // mainStore.resetPerssion(res.data.menu, res.data.permission);
        localStorage.setItem("userName", res.data.me.personName)
      }
    },
  },
});
