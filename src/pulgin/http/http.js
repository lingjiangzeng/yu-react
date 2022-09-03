import axios from "axios";
import config from "../../config/config.js";
const http = axios.create({
  baseURL: config.requestUrl,
  timeout: 1000 * 60,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
http.interceptors.request.use((config) => {
  let params = config.params || {};
  params.time = Date.now();
  params.socketid = window.$socket.mysocket.id; 数
  config.params = { params: window.$smCypto.doEncrypt(JSON.stringify(params)) };
  return config;
});
http.interceptors.response.use((response) => {
  return JSON.parse(window.$smCypto1.doDecrypt(response.data));
})
export default http;