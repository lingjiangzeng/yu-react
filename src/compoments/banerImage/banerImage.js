import React from "react";
import './banerImage.less';
import Paper from '@mui/material/Paper';
class BanerImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banerlist: props.banerlistdata,
      setIntervalobj: null
    };
    this.bannerboxRef = React.createRef();
  }
  componentDidMount() {
    let time = setInterval(() => {
      this.animationfun();
    }, 10000);
    this.setState({ setIntervalobj: time });
  }
  componentWillUnmount() {
    clearInterval(this.state.setIntervalobj);
  }
  animationfun = () => {
    let firstel = this.bannerboxRef.current.childNodes[0];
    firstel.style.transform = 'translate3d(-120%,0%,0px) scale(0.2)';
    let clonebannerDOM = firstel.cloneNode();
    let cloneimageboxDOM = firstel.childNodes[0].cloneNode();
    let cloneimgDOM = firstel.childNodes[0].childNodes[0].cloneNode();
    cloneimageboxDOM.appendChild(cloneimgDOM);
    clonebannerDOM.appendChild(cloneimageboxDOM);
    firstel.ontransitionend = () => {
      this.bannerboxRef.current.removeChild(firstel);
      let el = this.bannerboxRef.current.childNodes;
      for (let index = 0; index < el.length; index++) {
        el[index].style.transform = `translate3d(0%,0%,${index * (-50)}px) scale(${1 - (index * 0.1)})`;
      }
      clonebannerDOM.style.transform = `translate3d(0%,0%,${el.length * (-50)}px) scale(${1 - (el.length * 0.1)})`;
      this.bannerboxRef.current.appendChild(clonebannerDOM);
    }
  }
  render() {
    let banerelement = this.state.banerlist.map((value, index) => {
      let style = { transform: `translate3d(0%,0%,${index * (-50)}px) scale(${1 - (index * 0.1)})` };
      return (<Paper elevation={10} className="banner" key={`bander${index}`} style={style}>
        <div className="imagebox">
          <img src={value}></img>
        </div>
      </Paper>)
    })
    return (
      <div className="bannerbox" ref={this.bannerboxRef}>
        {banerelement}
      </div>
    )
  }
}

export default BanerImage