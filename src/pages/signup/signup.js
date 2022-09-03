import React from "react";
import './signup.less';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
let setTime = null;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getcodebuttontext: 'get code',
      ifgetcode: false,
      Stepactive: 0,
      nextstepdisenable: false,
      steps: [
        'Validation email',
        'Create an account and password',
        'Registration completed'
      ],
      errormsg: null,
      email: '',
      emailtip: 'Please enter email address!',
      showemailtip: false,
      validationemail: '',
      validationemailtip: 'Please enter the verification code !',
      showvalidationemailtip: false,
      account: '',
      accounttip: 'Please fill in your account number !',
      showaccounttip: false,
      password: '',
      passwordtip: 'Please fill in your password',
      showpasswordtip: false,
      againpassword: '',
      againpasswordtip: 'Please fill in your password',
      showagainpasswordtip: false,
      getCodeSetTime: 0,
    };
    this.validationinputRef = React.createRef()
  };
  componentWillUnmount() {
    clearInterval(setTime);
  };

  goback = () => {
    this.props.history.goBack();
  };

  verificatnextstep = () => {
    if (this.state.Stepactive == 0) {
      let flag = this.emailverif(this.state.email);
      let flag1 = this.verificationemailcode(this.state.validationemail);
      let flag2 = !!this.state.ifgetcode;
      if (flag2 && flag && flag1) {
        this.setState({ nextstepdisenable: true });
        window.$http({
          method: 'post',
          url: '/checkcode',
          params: {
            code: this.state.validationemail,
            email: this.state.email,
          }
        }).then((res) => {
          if (res.statusCode == 200) {
            this.nextstep();
          } else {
            this.setState({ errormsg: 'Verification code error' });
          };
          this.setState({ nextstepdisenable: false });
        })
      }

    } else if (this.state.Stepactive == 1) {
      let flag = this.accountverificat(this.state.account);
      let flag1 = this.passwordverificat(this.state.password, 'showpasswordtip', 'passwordtip');
      let flag2 = this.passwordverificat(this.state.againpassword, 'showagainpasswordtip', 'againpasswordtip');
      let flag3 = this.state.againpassword === this.state.password;
      if (!flag3) {
        this.setState({ errormsg: "The entered passwords are inconsistent", });
      } else {
        this.setState({ errormsg: null, });
        if (flag2 && flag && flag1) {
          this.setState({ nextstepdisenable: true });
          window.$http({
            method: 'post',
            url: '/registered',
            params: {
              account: this.state.account,
              password: this.state.againpassword,
              email: this.state.email,
            }
          }).then((res) => {
            if (res.statusCode == 200) {
              this.nextstep();
            } else {
              this.setState({ errormsg: 'The account has been registered' });
            };
            this.setState({ nextstepdisenable: false });
          })
        }
      }

    }
  }

  nextstep = () => {
    this.setState((state, props) => ({ Stepactive: state.Stepactive + 1 }));
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
      this.setState({ emailtip: "Please fill in the correct email address !", showemailtip: true, });
      return false;
    } else {
      this.setState({ showemailtip: false, });
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

  verificationChange(envent) {
    this.verificationemailcode(envent.target.value);
    this.setState({ validationemail: envent.target.value, errormsg: null });
  };

  accountverificat = (value) => {
    if (!value.replace(/\s/g, '')) {
      this.setState({ accounttip: "Please fill in your account number !", showaccounttip: true, });
      return false;
    };
    let emailRegExp = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]/;
    if (emailRegExp.test(value) || value.replace(/\s/g, '').length < 8) {
      this.setState({
        accounttip: "Please fill in your account number correctly.The account contains only uppercase English, lowercase English, and number. And only eight digits short !",
        showaccounttip: true,
      });
      return false;
    } else {
      this.setState({ showaccounttip: false, });
      return true;
    }
  };

  accountonChange = (envent) => {
    this.accountverificat(envent.target.value);
    this.setState({ account: envent.target.value, errormsg: null });
  };

  passwordverificat = (value, key, keymsg) => {
    if (!value.replace(/\s/g, '')) {
      let obj = {};
      obj[key] = true;
      obj[keymsg] = 'Please fill in your password',
        this.setState(obj);
      return false;
    };

    let RegExp1 = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    let RegExp2 = /[abcdefghijklmnopqrstuvwxyz]/;
    let RegExp3 = /[0123456789]/;
    let RegExp4 = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]/;
    if (RegExp1.test(value) && RegExp2.test(value) && RegExp3.test(value) && RegExp4.test(value) && value.replace(/\s/g, '').length >= 8) {
      let obj = {};
      obj[key] = false;
      this.setState(obj);
      return true;
    } else {
      let obj = {};
      obj[key] = true;
      obj[keymsg] = 'Please enter the correct password. The password must contain uppercase, lowercase, number, and special characters.And only eight digits short !',
        this.setState(obj);
      return false;

    }
  };

  passwordonChange = (envent) => {
    this.passwordverificat(envent.target.value, 'showpasswordtip', 'passwordtip')
    this.setState({ password: envent.target.value, errormsg: null, });
  };

  againpassword = (envent) => {
    this.passwordverificat(envent.target.value, 'showagainpasswordtip', 'againpasswordtip')
    this.setState({ againpassword: envent.target.value, errormsg: null, });
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
      url: '/getcode',
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
            this.setState({ getcodebuttontext: 'get code' })
          } else {
            this.setState((state, props) => (
              {
                getCodeSetTime: state.getCodeSetTime - 1,
                getcodebuttontext: `${state.getCodeSetTime - 1}s`
              }
            ))
          }
        }, 1000);
      } else if (res.statusCode == 7) {
        this.setState({ errormsg: 'The email address has been registered' });
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
            defaultValue={this.state.email}
            disabled={!!this.state.getCodeSetTime}
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
    } else if (this.state.Stepactive == 1) {
      element = <div className="accountandpassword">
        <Tooltip title={this.state.accounttip} arrow open={!!this.state.showaccounttip} placement="right-end">
          <TextField
            key={'enteraccount'}
            className="enteraccount"
            label="Enter account"
            autoFocus={true}
            variant="standard"
            defaultValue={this.state.account}
            onChange={(envent) => this.accountonChange(envent)}
          />
        </Tooltip>
        <Tooltip title={this.state.passwordtip} arrow open={!!this.state.showpasswordtip} placement="right-end">
          <TextField
            key={'enterpassword'}
            className="enterpassword"
            label="Enter password"
            type={'password'}
            variant="standard"
            defaultValue={this.state.password}
            onChange={(envent) => this.passwordonChange(envent)}
          />
        </Tooltip>
        <Tooltip title={this.state.againpasswordtip} arrow open={!!this.state.showagainpasswordtip} placement="right-end">
          <TextField
            key={'enterpasswordagain'}
            className="enterpassword"
            label="Enter password again"
            type={'password'}
            variant="standard"
            defaultValue={this.state.againpassword}
            onChange={(envent) => this.againpassword(envent)}
          />
        </Tooltip>
      </div>;
    } else {
      element = <div className="registeredsuccessfully">
        <span>Registered successfull!</span>
        <div>
          <span>&emsp;&ensp;&ensp;Please remember your account number and password. If you forget your password, you can retrieve it by email.Now click here to <span className="jumplogin" onClick={() => this.jumpLogin()}>login</span></span>
        </div>
      </div>;
    }

    return (
      <div className="signup">
        <Fab color="primary" aria-label="add" className="back" onClick={() => this.goback()}>
          <ArrowBackIosNewIcon className="icon" />
        </Fab>
        <div className="signupbox">
          <div className="signiplogo">
            <AccountCircleIcon className="logo"></AccountCircleIcon>
            <span>Registered account !</span>
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
          {this.state.Stepactive < 2 ? <Button disabled={this.state.nextstepdisenable} variant="contained" className="nextbut" onClick={() => this.verificatnextstep()}>{!!this.state.nextstepdisenable ? 'loading...' : (this.state.Stepactive == 1 ? "registered" : 'next')}</Button> : null}
        </div>

      </div>
    )
  }
}
export default Signup;