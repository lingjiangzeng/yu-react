
class resize {
  constructor() {
    this.resizefun = () => {
      let size = window.innerWidth;
      this.funarr.forEach(v => v(size));
      window.$store.dispatch({ type: 'setsize', params: { size: size } });
    };
    this.funarr = [];
    this.init()
  };
  init = () => {
    window.addEventListener('resize', this.resizefun)
  };
  reomveEvent = () => {
    window.removeEventListener('resize', this.resizefun)
  };
  addCallback = (fun) => {
    this.funarr.push(fun);
  };
  deleteCallback = (fun) => {
    let i = this.funarr.findIndex(v => v == fun);
    this.funarr.splice(i, 1);
  }
}

export default resize;