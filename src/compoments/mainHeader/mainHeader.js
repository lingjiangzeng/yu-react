import React from "react";
import './mainHeader.less';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import LoginIcon from '@mui/icons-material/Login';
import Fab from '@mui/material/Fab';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -10,
    top: 0,
    padding: '0 4px',
  },
}));
import { connect } from 'react-redux';
class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classifykey: 'home',
      classify: [
        {
          label: 'home',
          key: 'home'
        },
      ],
      searchvalue: '',
      openpopover: false,
      userselect: false,

    };
    this.inputref = React.createRef();
    this.openpopoverel = React.createRef();
    this.openpersonalmenus = React.createRef();
  };
  componentDidMount() {
    window.$keydown.addCallback((event) => {
      if (event.key == 'Enter' && event.code == 'Enter') {
        if (this.inputref.current == document.activeElement) {
          this.goodsearch();
        }
      }
    })
  };
  classifyClick = (key) => {
    this.setState({ openpopover: false })
    if (key == this.state.classifykey) { return; }
    this.setState({ classifykey: key, openpopover: false });
    this.props.classifyClick(key);
  };
  inputChange = (event) => {
    this.setState({ searchvalue: event.target.value });
  };
  goodsearch = () => {
    this.props.goodsearch(this.state.searchvalue);
  };
  openmeuns = () => {
    this.setState((state) => ({ openpopover: !state.openpopover, }));
  };
  openuserselect = () => {
    this.setState((state) => ({ userselect: !state.userselect, }));
  };
  openlogin = () => {
    this.props.openlogin()
  };
  openshopecart = () => {
    if (!!this.props.userState.islogin) {
      this.props.openshopecart();
    } else {
      this.props.openlogin();
    }
  };
  topersonal = () => {
    this.props.opentopersonal();
  };
  logOut = () => {
    this.openuserselect();
    window.$loading.open();
    window.$http({
      method: 'post',
      url: '/logout',
      params: {}
    }).then((res) => {
      if (res.statusCode == 200) {
        this.props.clearshopingcart()
        window.$socket.logout();
        window.$loading.close();
      }
    })
  }
  render() {
    let Buttons = this.state.classify.map(value => <Button size="large" className={`btn ${this.state.classifykey == value.key ? 'activebtn' : ''}`} key={value.key} onClick={() => this.classifyClick(value.key)}>{value.label}</Button>);
    let MenuItems = this.state.classify.map(value => <MenuItem key={value.key} onClick={() => this.classifyClick(value.key)}><span className={`allonmeunsbtn ${this.state.classifykey == value.key ? 'allonmeunsactivebtn' : ''}`}>{value.label}</span></MenuItem>);
    let menus = null;
    let userbtn = null;
    if (this.props.resize.size > 1300) {
      menus = <Stack spacing={2} direction="row" className="Stacknox"> {Buttons}</Stack>
    } else {
      menus = <Fab color="primary" aria-label="add" className="allonmeuns" ref={this.openpopoverel} onClick={() => this.openmeuns()}><FormatAlignLeftIcon /> </Fab>
    }
    if (!!this.props.userState.islogin) {
      userbtn = <Fab color="primary" aria-label="add" className="cartbtn" ref={this.openpersonalmenus} onClick={() => this.openuserselect()}>
        <PersonIcon className="icon" />
      </Fab>
    } else {
      userbtn = <Fab color="primary" aria-label="add" className="cartbtn" onClick={() => this.openlogin()}>
        <LoginIcon className="icon" />
      </Fab>
    }
    return (
      <div className="mainheader">
        <div className="hearleft">
          <svg t="1641136120858" className="logoIcon" viewBox="0 0 1024 1024" version="1.1" p-id="15599" width="200" height="200"><path d="M951.808 209.408L567.978667 13.482667a125.781333 125.781333 0 0 0-113.152 0L38.912 217.429333A69.461333 69.461333 0 0 0 0 279.722667v417.621333c0 49.664 27.477333 95.061333 70.826667 117.077333l384 195.925334a125.952 125.952 0 0 0 57.173333 13.482666 125.781333 125.781333 0 0 0 57.173333-11.264l384-195.925333c44.032-22.357333 71.68-68.778667 70.826667-119.296V325.973333c-0.341333-49.834667-28.330667-95.061333-72.192-116.565333z m-459.093333-118.442667a41.984 41.984 0 0 1 37.546666 0l338.261334 171.349334a15.36 15.36 0 0 1-0.170667 27.477333l-116.053333 56.490667a15.36 15.36 0 0 1-14.165334-0.341334L398.848 156.16a10.752 10.752 0 0 1 0.512-18.944zM469.333333 872.448a29.354667 29.354667 0 0 1-42.666666 26.112L108.714667 736.597333a43.690667 43.690667 0 0 1-23.381334-39.253333V388.096a29.354667 29.354667 0 0 1 42.837334-26.112l325.461333 168.277333A29.354667 29.354667 0 0 1 469.333333 556.373333z m-155.306666-664.064l316.928 177.152a11.264 11.264 0 0 1-0.512 19.968l-111.445334 54.613333a15.36 15.36 0 0 1-13.824-0.170666L162.474667 282.112a15.36 15.36 0 0 1 0.170666-27.306667l95.914667-47.616a59.392 59.392 0 0 1 55.466667 1.194667z m257.024 322.901333l325.461333-159.061333a29.354667 29.354667 0 0 1 42.154667 26.453333v298.666667a43.690667 43.690667 0 0 1-23.381334 39.253333L597.333333 898.56a29.354667 29.354667 0 0 1-42.666666-26.112V557.568a29.354667 29.354667 0 0 1 16.384-26.282667z" p-id="15600" fill="#1565C0"></path><path d="M376.490667 711.68l-202.069334-107.349333A33.109333 33.109333 0 0 1 156.842667 575.146667v-29.525334a15.36 15.36 0 0 1 22.528-13.653333l201.898666 107.349333a33.109333 33.109333 0 0 1 17.578667 29.184V698.026667a15.36 15.36 0 0 1-22.357333 13.653333z" p-id="15601" fill="#1565C0"></path></svg>
          {menus}
          <Menu
            id="basic-menu"
            anchorEl={this.openpopoverel.current}
            open={this.state.openpopover}
            onClose={() => this.openmeuns()}
          >
            {MenuItems}
          </Menu>
        </div>
        <div className="search">
          <SearchOutlinedIcon className="searchicon"></SearchOutlinedIcon>
          <input ref={this.inputref} onChange={(event) => this.inputChange(event)} defaultValue={this.state.searchvalue} className="searchinput" placeholder="search template..."></input>
          <Button variant="contained" size="large" className="searchbtn" onClick={() => this.goodsearch()}>search</Button>
        </div>
        <div className="operation">
          <Fab color="primary" aria-label="add" className="cartbtn" onClick={() => this.openshopecart()}>
            <StyledBadge badgeContent={this.props.userState.shopcart.length} color="secondary">
              <ShoppingCartIcon className="icon" />
            </StyledBadge>
          </Fab>
          {userbtn}
          <Menu
            id="userselectmenu"
            anchorEl={this.openpersonalmenus.current}
            open={this.state.userselect}
            onClose={() => this.openuserselect()}
          >
            <MenuItem onClick={() => this.topersonal()}><span className="operationmeunsbtn">personal</span></MenuItem>
            <MenuItem onClick={() => this.logOut()}><span className="operationmeunsbtn">Logout</span></MenuItem>
          </Menu>
        </div>
      </div>
    )
  }
}

export default connect(store => store)(MainHeader);