import React from "react";
import './forgetPassword.less';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import LockResetIcon from '@mui/icons-material/LockReset';
let setTime = null;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getcodebuttontext: 'get code',
      ifgetcode: false,
      Stepactive: 0,
      stpedisable: false,
      steps: [
        'Validation mail',
        'Reset passwords',
      ],
      errormsg: null,
      email: '',
      emailtip: 'Please enter email address!',
      showemailtip: false,
      validationemail: '',
      validationemailtip: 'Please enter the verification code !',
      showvalidationemailtip: false,
      getCodeSetTime: 0,
    };
    this.validationinputRef = React.createRef();
  };
  componentWillUnmount() {
    clearInterval(setTime);
  }
  goback = () => {
    this.props.history.goBack();
  };

  verificatnextstep = () => {
    if (this.state.Stepactive == 0) {
      let flag = this.emailverif(this.state.email);
      let flag1 = this.verificationemailcode(this.state.validationemail);
      let flag2 = !!this.state.ifgetcode;
      if (flag2 && flag && flag1) {
        this.setState({ stpedisable: true });
        window.$http({
          method: 'post',
          url: '/checkretrievecode',
          params: {
            email: this.state.email,
            code: this.state.validationemail
          }
        }).then((res) => {
          if (res.statusCode == 200) {
            this.nextstep();
          } else {
            this.setState({ errormsg: 'Verification code error' });
          };
          this.setState({ stpedisable: false });
        })
      }
    }
  };
  nextstep = () => {
    this.setState((state) => ({ Stepactive: state.Stepactive + 1 }));
  };
  jumpLogin = () => {
    this.props.history.replace({
      pathname: "/",
      params: {
        open: 'login'
      }
    });
  };
  emailverif = (value) => {
    if (!value.replace(/\s/g, '')) {
      this.setState({
        emailtip: "Please enter email address !",
        showemailtip: true,
      });
      return false;
    };
    let emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailRegExp.test(value)) {
      this.setState({
        emailtip: "Please fill in the correct email address !",
        showemailtip: true,
      });
      return false;
    } else {
      this.setState({
        showemailtip: false,
      });
      return true;
    }
  };

  emailChange = (envent) => {
    this.emailverif(envent.target.value);
    this.setState({ email: envent.target.value, errormsg: null });
  };

  verificationemailcode = (value) => {
    if (!value.replace(/\s/g, '')) {
      this.setState({ showvalidationemailtip: true, });
      return false;
    } else {
      this.setState({ showvalidationemailtip: false, });
      return true;
    }
  };

  verificationChange = (envent) => {
    this.verificationemailcode(envent.target.value);
    this.setState({ validationemail: envent.target.value, errormsg: null });
  };

  getCode = () => {
    if (this.state.getCodeSetTime != 0) {
      return;
    };
    if (!this.emailverif(this.state.email)) {
      return;
    }
    window.$http({
      method: 'get',
      url: '/retrievepassword',
      params: {
        email: this.state.email,
      }
    }).then((res) => {
      if (res.statusCode == 200) {
        this.setState({ getCodeSetTime: 120, getcodebuttontext: "120s", validationemail: '', ifgetcode: true });
        this.validationinputRef.current.value = '';
        setTime = setInterval(() => {
          if (this.state.getCodeSetTime == 0) {
            clearInterval(setTime);
            this.setState({ getcodebuttontext: 'get code' });
          } else {
            this.setState((state) => (
              {
                getCodeSetTime: state.getCodeSetTime - 1,
                getcodebuttontext: `${state.getCodeSetTime - 1}s`
              }
            ))
          }
        }, 1000);
      } else if (res.statusCode == 7) {
        this.setState({ errormsg: 'The email address does not have a registered account' });
      }
    })
  }
  render() {
    let element = null;
    if (this.state.Stepactive == 0) {
      element = <div className="validationemail">
        <Tooltip title={this.state.emailtip} arrow open={!!this.state.showemailtip} placement="right-end">
          <TextField
            key={'enteremail'}
            className="enteremail"
            label="Enter your email"
            autoFocus={true}
            variant="standard"
            disabled={!!this.state.getCodeSetTime}
            defaultValue={this.state.email}
            onChange={(envent) => this.emailChange(envent)}
          />
        </Tooltip>
        <div className="verificationcode">
          <Tooltip title={this.state.validationemailtip} arrow open={!!this.state.showvalidationemailtip} placement="bottom">
            <TextField
              key={'enterverificationcode'}
              className="enterverificationcode"
              label="verification code"
              variant="standard"
              inputRef={this.validationinputRef}
              defaultValue={this.state.validationemail}
              onChange={(envent) => this.verificationChange(envent)}
            />
          </Tooltip>
          <Button variant="outlined" className="getcodebut" size="small" onClick={() => this.getCode()}>{this.state.getcodebuttontext}</Button>
        </div>
      </div>;
    } else {
      element = <div className="registeredsuccessfully">
        <span>Need to reset password !</span>
        <div>
          <span>&emsp;&ensp;&ensp;We have sent a reset link to your email, please open the link to reset your password. If the reset is successful click here to <span className="jumplogin" onClick={() => this.jumpLogin()}>login</span></span>
        </div>
      </div>;
    }

    return (
      <div className="forgetPassword">
        <Fab color="primary" aria-label="add" className="back" onClick={() => this.goback()}>
          <ArrowBackIosNewIcon className="icon" />
        </Fab>
        <div className="signupbox">
          <div className="signiplogo">
            <LockResetIcon className="logo"></LockResetIcon>
            <span>Retrieve password !</span>
          </div>
          <Stepper activeStep={this.state.Stepactive} alternativeLabel className="ne">
            {this.state.steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <hr className="signupboxhr"></hr>
          {
            !!this.state.errormsg ? <Alert severity="error" className="errormsg">{this.state.errormsg}</Alert> : null
          }
          {element}
          {this.state.Stepactive < 1 ? <Button disabled={this.state.stpedisable} variant="contained" className="nextbut" onClick={() => this.verificatnextstep()}>next</Button> : null}
        </div>

      </div>
    )
  }
}
export default Signup;