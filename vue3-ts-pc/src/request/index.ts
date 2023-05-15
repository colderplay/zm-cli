//http.ts
import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";

const env = process.env.NODE_ENV;

let BASE_URL: any;
if (env === "development") {
  BASE_URL = "/";
} else if (env === "tester") {
  BASE_URL = "https://p-test.zmlearn.com/";
} else if (env === "uat") {
  BASE_URL = "https://p-test.zmlearn.com/";
} else if (env === "production") {
  BASE_URL = "https://www.zmlearn.com/";
}

const Http = axios.create({
  withCredentials: true,
  // baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
  timeout: 30000,
})

Http.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    return config;
  },
  (error) => {
    return error;
  }
);

// 响应拦截
Http.interceptors.response.use((response) => {
  if (response.data.code == "0000" || response.data.code == "0") {
    return Promise.resolve(response);
  } else if (response.data.code === "11") {
    window.location.href =
      BASE_URL + "login?redirectUrl=" + encodeURIComponent(location.href);
  } else if (
    response.status.toString().charAt(0) !== "2" ||
    !response.data.success ||
    response.data.code === "1"
  ) {
    ElMessage({
      message: response.data.message,
      type: "error",
    });
  } else if (response.data.code) {
    return Promise.reject(response.data);
  } else {
    return Promise.reject("网络错误！");
  }
});

interface ResType<T> {
  code: number | string;
  data?: T;
  msg: string;
  err?: string;
  success: boolean;
  message?: string;
}

interface interHttp {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  put<T>(url: string, params?: unknown): Promise<ResType<T>>;
  delete<T>(url: string, params?: unknown): Promise<ResType<T>>;
}

const http: interHttp = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      Http.get(url, { params })
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        })
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      Http.post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        })
    });
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      Http.put(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        })
    });
  },
  delete(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      Http.delete(url)
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err.data);
        })
    });
  },
};
export default http;
export { BASE_URL };
