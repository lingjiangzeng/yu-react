import http from "./http/http.js";
import smCypto from "./smCypto/smCypto.js";
import smCypto1 from "./smCypto/smCypto1.js";
import loading from './loading.js';
import dialog from './dialog.js';
import resize from './resize.js';
import keydown from './keydown.js';
import datehandle from './datehandle.js';
const install = (that, options) => {
  that.$smCypto = new smCypto();
  that.$smCypto1 = new smCypto1();
  that.$http = http;
  that.$loading = new loading();
  that.$dialog = new dialog();
  that.$resize = new resize();
  that.$keydown = new keydown();
  that.$datehandle = datehandle;

}
export default install;