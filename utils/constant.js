// 设置生成cookie头
const USER_TOKEN = "public-token";
// 最终服务器地址
const SERVER_URL = "http://localhost:8888/";
/**
 * @return {string}
 */
const COOKIES_JSON = function (cookies) {
  if (!cookies)  return ''
  let cookieArr = cookies.split(";");
  let obj = {}
  cookieArr.forEach((i) => {
    let arr = i.split("=");
    obj[arr[0]] =arr[1];
  });
  return obj
}
export {
  USER_TOKEN,
  SERVER_URL,
  COOKIES_JSON
}
