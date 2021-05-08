/**
 * 写入cookie
 * @param {*} key
 * @param {*} value
 * @param { Number } time 过期时间，毫秒数
 */
function setCookie(key, value, time = 0) {
  const expires = new Date(new Date().getTime() + time);
  document.cookie = `${key}=${value}; expires=${expires}`;
}

/**
 * 读取是否有该cookie值
 * @param {*} key 传入key值
 * @returns Boolean 返回一个布尔值
 */
function getCookie(key) {
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
/**
 * 删除cookie
 * @param {*} key key值
 * 将cookie的过期时间设置为以前的时间就会删除cookie
 */
function delCookie(key) {
  setCookie(key, '', -1);
}

export default {
  getCookie,
  setCookie,
  delCookie,
};
