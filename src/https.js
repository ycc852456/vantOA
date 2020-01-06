import axios from 'axios';
import store from '../src/store/store';
import * as types from '../src/store/types';
import router from '../src/router/index';

//axios配置
let instance = axios.create({
  timeout:10000,
  baseURL:"http://www.middle888.top:8081"
});

//http request 拦截器
instance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http reponse拦截器
instance.interceptors.response.use(
  response => {
    if(response.data.code !== 0){
      alert(response.data.errMsg);
    }
    return response.data;  //只返回服务器返回的data信息
  },
  error => {
    console.log("报错信息");
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT);
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.path},
          });
          break;
        case 404:
          console.log(error.response.data);
          break;
        case 500:
          console.log(error.response.data);
          break;
      }
    }
    return Promise.reject(error.response.data);
  },
);

/**
 * method  请求的方法：get、post、delete、put
 * url 请求的url；
 * data  请求的参数
 * @return {Promise}  返回一个promise的对象，相当于axios请求数据的返回值
 */
export default function(method, url, data = null)
{
  method = method.toLowerCase();
  if (method === 'post') {
    return instance.post(url, data);
  } else if (method === 'get') {
    return instance.get(url, {params: data})
  } else if (method === 'delete') {
    return instance.delete(url, {params: data})
  } else if (method === 'put') {
    return instance.put(url, data);
  } else {
    console.error("未知的method" + method);
    return false;
  }
}
