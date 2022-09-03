import React from "react";
import './information.less';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import active from "../../../pulgin/active.js";
export default class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  componentDidMount() {
  };
  stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: '#bdbdbd',
        width: 84,
        height: 84
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  render() {
    return (
      <div className="information">
        <div className="information-header">
          <div className="information-content">
            <Avatar {...this.stringAvatar('lingjiang zeng')} src={this.props.userMsg.Avatar} className="information-header-image" />
            <div className="edit"><EditIcon /><span>Profile picture</span></div>
          </div>
          <div className="information-content">
            <div><span>Email</span>&ensp;:&ensp;<span>{this.props.userMsg.email}</span><IconButton className="eidticon"><EditIcon className="icon" /></IconButton></div>
            <div><span>Account</span>&ensp;:&ensp;<span>{this.props.userMsg.account}</span><IconButton className="eidticon"><EditIcon className="icon" /></IconButton></div>
            <div><span>Registration time</span>&ensp;:&ensp;<span>{window.$datehandle(this.props.userMsg.registrationTime)}</span></div>
          </div>
          <div className="information-content">
            <div><span>Last Login Time</span> : <span>{window.$datehandle(this.props.userMsg.lastlogintime)}</span></div>
          </div>
        </div>
        <div className="information-bottom">
          <div className="resetpasswordbox" onMouseDown={active}>
            <span>reset password</span>
          </div>
        </div>
      </div>
    )
  }
}