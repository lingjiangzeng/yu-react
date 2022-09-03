import React from 'react';
import './personal.less';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Fab from '@mui/material/Fab';
import OrderPage from './orderPage/orderPage.js';
import Information from './information/information.js'
export default class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedmeuns: 'order',
      personalmeuns: [
        {
          label: 'order',
          icon: '',
          key: "order",
          icon: WysiwygIcon,
          iconcolor: this.getcolor(),
          active: false,
        },
        {
          label: 'information',
          icon: '',
          key: "information",
          icon: ManageAccountsIcon,
          iconcolor: this.getcolor(),
          active: false
        },
      ],
      seachTime: {
        startTime: new Date(1995, 12, 11),
        endTime: new Date(),
      },
      orderlist: [],
      userMsg: {}

    };
    this.startTimeRef = React.createRef();
  };

  componentDidMount() {
    this.getorderlist();
    this.meunsCheck(this.state.checkedmeuns)
  };

  componentWillUnmount() {
  };

  setseachTime = (obj) => {
    this.setState({ seachTime: obj })
  };

  getorderlist = () => {
    window.$http({
      method: 'post',
      url: '/orderlist',
      params: {
        startTime: (new Date(this.state.seachTime.startTime)).getTime(),
        endTime: (new Date(this.state.seachTime.endTime)).getTime()
      }
    }).then((res) => {
      if (res.statusCode == 200) {
        console.log(res.data)
        this.setState({ orderlist: res.data })
      }
      this.getusermsg();
    })
  };

  getusermsg = () => {
    window.$http({
      method: 'get',
      url: '/usermsg',
      params: {}
    }).then((res) => {
      if (res.statusCode == 200) {
        this.setState({ userMsg: res.data })
      }
    })
  }

  openStartTime = (bool) => {
    this.setState({ startTimeOpen: bool }, () => {
      if (bool) {
        setTimeout(() => {
          document.querySelector('.MuiModal-root').classList.add('MuiModal-root-addlclass')
        })
      }
    })
  };

  openEndTime = (bool) => {
    this.setState({ endTimeOpen: bool }, () => {
      if (bool) {
        setTimeout(() => {
          document.querySelector('.MuiModal-root').classList.add('MuiModal-root-addlclass-1')
        })
      }
    })
  };

  goback = () => {
    this.props.history.goBack();

  };

  meunsCheck = (key) => {
    this.setState((state) => ({
      checkedmeuns: key,
      personalmeuns: state.personalmeuns.map((val) => {
        if (val.key == key) {
          val.active = true;
        } else {
          val.active = false;
        }
        return val;
      })
    }))
  };

  getcolor = () => {
    let colorarr = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4',
      '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
      '#ff9800', '#ff5722', '#ff1744', '#f50057', '#d500f9', '#651fff', '#3d5afe',
      '#2979ff', '#00b0ff', '#00e5ff', '#1de9b6', '#00e676', '#76ff03', '#c6ff00',
      '#c6ff00', '#ffc400', '#ff9100', '#ff3d00',
    ]
    let random = Math.floor(Math.random() * colorarr.length);
    return colorarr[random];
  };

  stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: this.getcolor(),
        width: 48,
        height: 48
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  render() {
    let elements = this.state.personalmeuns.map((val) => {
      return <div className={val.active ? 'meunsitems active' : 'meunsitems'} key={val.key} onClick={() => this.meunsCheck(val.key)}>
        <val.icon className='meunsitemsicom' style={{ color: val.iconcolor }}></val.icon>
        <span>{val.label}</span>
      </div>
    });

    let page = null;
    if (this.state.checkedmeuns == 'order') {
      page = <OrderPage orderlist={this.state.orderlist} {...this.state.seachTime} setseachTime={this.setseachTime}></OrderPage>
    } else if (this.state.checkedmeuns == 'information') {
      page = <Information userMsg={this.state.userMsg}></Information>
    }
    return (
      <div className='personal'>
        <div className='personalboxbottom'>
          <div className='personalboxbottomleft'>
            <Fab color="primary" aria-label="add" className="back" onClick={() => this.goback()}>
              <ArrowBackIosNewIcon className="icon" />
            </Fab>
            {elements}
          </div>
          <div className='personalboxbottomrigth'>
            {page}
          </div>
        </div>
      </div>
    )
  }
}