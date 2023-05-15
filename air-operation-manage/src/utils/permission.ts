import { useMainStore } from "@/store";

export function isPermission(value: []) {
  const mainStore = useMainStore();
  if (value && value instanceof Array && value.length > 0) {
    if (mainStore && mainStore.userPerssion) {
      const roles = mainStore.userPerssion
      const permissionRoles = value;

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      })

      if (!hasPermission) {
        return false;
      }
      return true;
    }
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`);
    return false;
  }
}
