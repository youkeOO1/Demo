/**
 * 操作cookie
 */
// 获取cookie
function getCookie(key) {
  /**
   * 将cookie分割为数组
   * 将分割为数组的cookie 转换为跟容易保存数据的对象
   * 将数组每一项遍历出来数组内保存的每一项格式为 key=value 将这个格式转对象保存起来
   * 判断该对象是否有该key值
   */
  const cookie = document.cookie.trim().split(';');
  const cookieObj = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cookie.length; i++) {
    const cookieItem = cookie[i].split('=');
    // eslint-disable-next-line prefer-destructuring
    cookieObj[cookieItem[0]] = cookieItem[1];
  }
  return cookieObj[key];
}
// 写入cookit
function setCookie(key, value, time) {
  /**
   * 设置cookie过期时间
   * 给cookie 赋值
   */
  const expires = new Date(new Date().getTime() + time);
  document.cookie = `${key}=${value}; expires=${expires.toGMTString()}`;
}
// 删除cookie
function deleteCookie(key) {
  /**
   * 将cookie的过期时间设置为以前的时间就会删除cookie
   */
  setCookie(key, '', -1);
}

export default {
  getCookie,
  setCookie,
  deleteCookie,
};
