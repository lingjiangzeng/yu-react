import React from "react";
import './homePage.less';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import active from "../../../pulgin/active.js";
import { connect } from 'react-redux';
let settime = null;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  componentDidMount() {
    console.log(this.props)
  };
  componentWillUnmount(){
    clearTimeout(settime);
  };
  buynowdownload = (event, data) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(data)
    if (!this.props.userState.islogin) {
      this.props.openlogin()
    }
  };

  addcart = (event, data) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(data)
    if (!this.props.userState.islogin) {
      this.props.openlogin()
    }
  };
  goGoodDetail =()=>{
    clearTimeout(settime);
    settime = setTimeout(() => {
      this.props.history.push({
        pathname: "/gooddeatil",
        params: {
          goodID: 'login'
        }
      });
    }, 400)
  }

  render() {
    let element = this.props.goodlist.map((val, index) => <div className="showbox" onMouseDown={active} onClick={()=>this.goGoodDetail()} key={val.goodID}>
      <img src={val.image}></img>
      <div className="showboxoperation">
        <div className="priceus">
          <AttachMoneyIcon className="priceusicon"></AttachMoneyIcon>
          <span>{val.goodprice}</span>
        </div>
        <IconButton  color="primary" onClick={(event)=> {event.stopPropagation(); event.preventDefault();}} onMouseDown={(event) => this.buynowdownload(event, val)}>
          <DownloadIcon className="operationicon" />
        </IconButton>
        <IconButton  color="primary" onClick={(event)=> {event.stopPropagation(); event.preventDefault();}} onMouseDown={(event) => this.addcart(event, val)}>
          <AddShoppingCartIcon />
        </IconButton>
      </div>
    </div>)

    return (
      <div className="homepage">
        <div className="listbox">
          {element}
        </div>
      </div>
    )
  }
}
export default connect(store => store)(HomePage);