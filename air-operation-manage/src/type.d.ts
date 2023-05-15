export {}; //给全局this加属性和方法
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $isPermission: Function;
  }
}
