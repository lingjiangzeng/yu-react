
class keydown {
  constructor() {
    this.keydownfun = (event) => {
      this.funarr.forEach(v => v(event));
    };
    this.funarr = [];
    this.init()
  };

  init = () => {
    window.addEventListener('keydown', this.keydownfun)
  };
  reomveEvent = () => {
    window.removeEventListener('keydown', this.rkeydownfun)
  };
  addCallback = (fun) => {
    this.funarr.push(fun);
  };
  deleteCallback = (fun) => {
    let i = this.funarr.findIndex(v => v == fun);
    this.funarr.splice(i, 1);
  }
}

export default keydown;