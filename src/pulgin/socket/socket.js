import { io } from 'socket.io-client';
import config from "../../config/config.js";
class socket {
  constructor(socketcallback) {
    this.mysocket = null;
    this.socketcallback = socketcallback;
    this.init();
  };
  init = async () => {
    this.mysocket = await io(config.socketUrl.url, {
      withCredentials: true,
      autoConnect: true,
      reconnection: false,
      path: config.socketUrl.path
    });
    this.mysocket.on('connect', () => {
      this.mysocket.on('sendKey', (msg) => {
        window.$smCypto.setPublicKey(msg);
        this.mysocket.emit('getpublicKey', window.$smCypto1.keypair.publicKey, () => {
          this.mysocket.emit('authenticationtoken');
        });
      });
      this.mysocket.on('onselfEvent', (msg) => {
        if (msg.type == 'login') {
          this.socketcallback(() => {
            if (!!msg.status) { window.$store.dispatch({ type: 'login', params: { islogin: true } }); } else { this.logout(); }
          });
        }
        if (msg.type == 'robtologin' && !!msg.status) {
          this.logout();
          window.$dialog.open({ title: 'Account exception warning!', content: "Your account has been logged in by someone else" });
        }
      })
      this.mysocket.on('roadcastEvents', (msg) => {
        if (msg.roadcastType === 'updateKey') {
          window.$smCypto.setPublicKey(msg.content);
        } else if (msg.roadcastType === 'againLogin') {
          this.logout();
        }
      });
      if (!window.sessionStorage.getItem('accessRecord')) {
        this.mysocket.emit('accessRecord');
        window.sessionStorage.setItem('accessRecord', 'accessRecord');
      }
    });
    this.mysocket.on('disconnect', () => {
      this.mysocket.disconnect();
    })
  };
  loginSuccessfully = (msg) => {
    this.mysocket.emit('loginSuccessfully', msg);
  }
  logout = () => {
    window.$store.dispatch({ type: 'login', params: { islogin: false } });
    cookieStore.getAll().then((res) => {
      res.forEach(v => {
        window.cookieStore.delete(v.name);
      });
    });
    if (window.$Router.history.pathname == '/personal') { window.$Router.history.replace('/') }
  }

}
export default socket;