import req from '../https';

//登陆
export  const login = params =>req('post','/login',params);

//退出
export const logout = params =>req('post','logout',params);
