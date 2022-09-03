import React, { Suspense } from "react";
import "./home.less";
import MainHeader from '../../compoments/mainHeader/mainHeader.js';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import Slide from '@mui/material/Slide';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Fab from '@mui/material/Fab';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const HomePage = React.lazy(() => import('./homePage/homePage.js'));
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showlogin: false,
      logining: false,
      account: '',
      password: '',
      verificationerror: false,
      verificationerrormsg: "",
      cartlist: [],
      CheckboxAll: true,
      shwodrawer: false,
      classifykey: "home",
      homePagearr: [],
      allhomePagearr: [],
    }
  };

  componentDidMount() {
    if (!!this.props.history.location.params && this.props.history.location.params.open == "login") {
      this.openlogin();
    };
    window.$http({
      method: 'get',
      url: '/goodList',
      params: {}
    }).then((res) => {
      if (res.statusCode == 200) {
        this.setState({ homePagearr: res.data, allhomePagearr: res.data });
        if (!!this.props.userState.islogin) {
          this.getshoppingcart()
        }
      }
    })
  };

  goodsearch = (value) => {
    if (!!value) {
      this.setState({ homePagearr: this.state.allhomePagearr.filter(v => v.goodName.includes(value) || v.type.includes(value)) })
    } else {
      this.setState({ homePagearr: this.state.allhomePagearr });
    }
  };

  classifyClick = (key) => {
    this.setState({ classifykey: key });
  };

  openshopecart = () => {
    this.setState((state) => ({ shwodrawer: !state.shwodrawer }));
  };

  openlogin = () => {
    this.setState((state) => ({ showlogin: !state.showlogin, account: '', password: '', verificationerror: false }));
  };

  accountchange = (e) => {
    this.setState({ account: e.target.value, verificationerror: false });
  };

  passwordchange = (e) => {
    this.setState({ password: e.target.value, verificationerror: false });
  };

  confirmlogin = () => {
    if (this.state.logining == 'LOGIN') {
      return;
    }
    if (!this.state.account || !this.state.password) {
      this.setState({ verificationerror: true, verificationerrormsg: "Please enter your account number and password!" });
      return
    }
    this.setState({ logining: true });
    window.$http({
      method: 'post',
      url: '/login',
      params: {
        account: this.state.account,
        password: this.state.password
      }
    }).then((res) => {
      this.setState({ logining: false });
      if (res.statusCode == 200) {
        window.$socket.loginSuccessfully(res.data);
        this.props.dispatch({ type: 'login', params: { islogin: true } });
        this.setState({ logining: false, showlogin: false, account: '', password: '', verificationerror: false });
        this.getshoppingcart()
      } else {
        this.setState({ logining: false, verificationerror: true, verificationerrormsg: "The account number or password you entered is wrong!" });
      }
    })
  };

  getshoppingcart = () => {
    window.$http({
      method: 'get',
      url: '/shopingcart',
      params: {}
    }).then((res) => {
      if (res.statusCode == 200) {
        let goodID = res.data.good.split(',');
        let arr = this.state.homePagearr.filter(v => goodID.includes(v.goodID));
        this.props.dispatch({ type: 'setshopcart', params: { shopcart: arr } });
        this.setState({ cartlist: arr.map((v) => { v.Checkbox = true; return v; }) });
      }
    })
  };

  clearshopingcart = () => {
    this.props.dispatch({ type: 'setshopcart', params: { shopcart: [] } });
    this.setState({ cartlist: [] });
  };

  CheckboxAllfun = (e) => {
    let list = this.state.cartlist;
    list.forEach(vaule => vaule.Checkbox = e.target.checked);
    this.setState({ cartlist: list });
    this.setState({ CheckboxAll: e.target.checked });
  };

  onselfchange = (e, goodid, index) => {
    let list = this.state.cartlist;
    list[index].Checkbox = e.target.checked;
    this.setState({ cartlist: list });
    let CheckboxAll = this.state.cartlist.every(value => value.Checkbox);
    this.setState({ CheckboxAll: CheckboxAll });
  };

  cartDelete = (goodid, index) => {
    let list = this.state.cartlist;
    list.splice(index, 1);
    this.setState({ cartlist: list });
  };

  toforgetPassword = () => {
    this.props.history.push('/forgetPassword')
  };

  tosignup = () => {
    this.props.history.push('/signup')
  };

  opentopersonal = () => {
    this.props.history.push('/personal')
  };

  render() {
    let PageElement = null;
    if (this.state.classifykey == 'home') {
      PageElement = <HomePage openlogin={this.openlogin} goodlist={this.state.homePagearr} history={this.props.history} />;
    }

    let verificationerror = null;
    if (!!this.state.verificationerror) {
      verificationerror = <Alert severity="error" className="verificationerror">{this.state.verificationerrormsg}</Alert>;
    } else {
      verificationerror = null;
    }

    let cartlistelement = this.state.cartlist.map((value, index) => {
      return <Paper elevation={3} className="listitem" key={value.goodID}>
        <Checkbox checked={value.Checkbox} onChange={(e) => this.onselfchange(e, value.goodID, index)} />
        <div className="goodmsg">
          <img src={value.image}></img>
          <div className="goodtext">
            <div className="goodname"><span>{value.goodName}</span></div>
            <div className="goodsqp">
              <AttachMoneyIcon className="priceusicon"></AttachMoneyIcon>
              <span>{value.goodprice}</span>
            </div>
          </div>
        </div>
        <IconButton aria-label="delete" color="primary" className="deletegoods" onClick={() => this.cartDelete(value.goodID, index)}>
          <DeleteIcon />
        </IconButton>
      </Paper>
    })

    return (
      <div className="main">
        <MainHeader clearshopingcart={this.clearshopingcart} openshopecart={this.openshopecart} openlogin={this.openlogin} classifyClick={this.classifyClick} goodsearch={this.goodsearch} opentopersonal={this.opentopersonal}></MainHeader>
        <Drawer anchor='right'
          className="miandrawerclass"
          open={this.state.shwodrawer} >
          <div className="cartbox">
            <div className="titlebox">
              <Fab color="primary" variant="contained" className="back" onClick={() => this.openshopecart()}>
                <ArrowBackIosNewIcon className="icon" />
              </Fab>
            </div>
            <div className="contentbox">
              {cartlistelement}
            </div>
            <div className="bottombox">
              <Checkbox checked={this.state.CheckboxAll} onChange={(e) => this.CheckboxAllfun(e)} />
              <Button size="large" variant="contained" className="topay">to pay</Button>
            </div>
          </div>
        </Drawer>
        <Dialog
          className="miandialogclass"
          TransitionComponent={Transition}
          open={this.state.showlogin}>
          <div className="loginbox">
            <IconButton color="primary" className="close" onClick={() => this.openlogin()}>
              <CloseIcon className="icon" />
            </IconButton>
            <div className="loginiconbox">
              <LoginIcon className="loginicon"></LoginIcon>
            </div>
            <span className="logintitle">LOGIN</span>
            <TextField
              required
              label="account or email"
              defaultValue={this.state.account}
              variant="filled"
              onChange={(e) => this.accountchange(e)}
              className="inputext"
            >
            </TextField>
            <TextField
              required
              label="password"
              defaultValue={this.state.password}
              variant="filled"
              type="password"
              onChange={(e) => this.passwordchange(e)}
              className="inputext"
            >
            </TextField>
            <Button size="large" disabled={this.state.logining} variant="contained" onClick={() => this.confirmlogin()} className="confirmbtn">{this.state.logining ? 'LOGIN...' : 'LOGIN'}</Button>
            {verificationerror}
            <div className="loginoption">
              <Button size="large" variant="text" disableRipple onClick={() => this.toforgetPassword()}>Forgot password?</Button>
              <Button size="large" variant="text" disableRipple onClick={() => this.tosignup()}>Sign Up?</Button>
            </div>
          </div>
        </Dialog>
        <Suspense fallback={<></>}>
          {PageElement}
        </Suspense>
      </div>
    )
  }
}
export default connect(store => store)(Main);