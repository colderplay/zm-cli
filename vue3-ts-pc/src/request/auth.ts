import { getAuth } from "./api";
import { useMainStore } from "@/store/index";

const env = process.env.NODE_ENV;
let appCode: string;
if (env === "development") {
  appCode = "edd26ad7b19741bbbc91dd27facff07d";
} else if (env === "tester") {
  appCode = "edd26ad7b19741bbbc91dd27facff07d";
} else if (env === "uat") {
  appCode = "edd26ad7b19741bbbc91dd27facff07d";
} else if (env === "production") {
  appCode = "288f6944bafb4fc0a6ddf2a036f2011a";
}

export const getAuthInfor = async () => {
  const mainStore = useMainStore();
  const res = await getAuth({
    appCode,
  });
  if (res.data) {
    mainStore.resetPerssion(res.data.menu, res.data.permission);
    localStorage.setItem("userName", res.data.me.personName);
  }
};
