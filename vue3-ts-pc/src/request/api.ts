import http from "@/request/index"
import { BASE_URL } from "./index"

interface interAuthParm {
  appCode: string;
}
interface interMe {
  personName: string;
}
interface interAuthRes {
  me: interMe;
  menu: [];
  permission: [];
}
// 获取用户权限
export const getAuth = (data: interAuthParm) => {
  return http.get<interAuthRes>(`${BASE_URL}api/auth/sys/initInfo`, data)
}
