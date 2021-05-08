/* eslint-disable import/newline-after-import */
// eslint-disable-next-line import/newline-after-import
import axios from 'axios';
import urlDefault from './urlDefault';
// const appkey = 'youkeOO1_1597126810547';
const appkey = 'Q_A_Q_1590927055348';
const ajax = axios.create({
  baseURL: urlDefault.baseURL,
  params: {
    appkey,
  },
});
// 响应数据拦截
ajax.interceptors.response.use((response) => {
  const newData = response.data;
  if (newData.status === 'success') {
    return newData;
  }
  return Promise.reject(newData.msg);
});
// 发送与获取数据
// url+路径+appkey+数据

const login = (data) => ajax.post(urlDefault.login, `appkey=${appkey}&${data}`);
const logon = (data) => ajax.post(urlDefault.logon, `appkey=${appkey}&${data}`);
const updateStu = (data) => ajax.get(urlDefault.updateStu, {
  params: {
    ...data,
  },
});
const getStu = (page, size) => ajax.get(urlDefault.getStu, {
  params: {
    page,
    size,
  },
});
const delStu = (sNo) => ajax.get(urlDefault.delStu, {
  params: {
    sNo,
  },
});
const addStu = (data) => ajax.get(urlDefault.addStu, {
  params: {
    ...data,
  },
});
const searchStu = (data) => ajax.get(urlDefault.searchStu, {
  params: {
    ...data,
  },
});

export default {
  login,
  logon,
  getStu,
  updateStu,
  delStu,
  addStu,
  searchStu,
};
