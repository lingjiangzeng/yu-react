import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from "react-router-dom";
import RootBox from './compoments/rootBox/rootBox.js';
const NotFoun = React.lazy(() => import(/* webpackChunkName: "notFund" */'./pages/notFound/notFund.js')); /
const Home = React.lazy(() => import(/* webpackChunkName: "Home" */'./pages/home/home.js'));
const ForgetPassword = React.lazy(() => import(/* webpackChunkName: "forgetPassword" */'./pages/forgetPassword/forgetPassword.js'));
const Signup = React.lazy(() => import(/* webpackChunkName: "signup" */'./pages/signup/signup.js'));
const Personal = React.lazy(() => import(/* webpackChunkName: "Personal" */'./pages/personal/personal.js'));
const Gooddeatil = React.lazy(() => import(/* webpackChunkName: "Personal" */'./pages/gooddeatil/gooddeatil.js'));
class BasicRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [ // {path:路径，name:名称，component: 组件，children：子路由}
        {
          path: '/',
          name: 'home',
          component: withRouter(Home),
        },
        {
          path: '/forgetPassword',
          name: 'forgetPassword',
          component: withRouter(ForgetPassword),
        },
        {
          path: '/signup',
          name: 'signup',
          component: withRouter(Signup),
        },
        {
          path: '/personal',
          name: 'personal',
          component: withRouter(Personal),
        },
        {
          path: '/gooddeatil',
          name: 'gooddeatil',
          component: withRouter(Gooddeatil),
        },
      ]
    };
  };
  handlerfun(val) {
    if (!!val.children && (val.children instanceof Array) && !!val.children.length) {
      return <Route key={val.path} path={val.path} render={(res) => {
        return (
          <val.component>
            <Switch>
              {
                val.children.map((childrenvalue) => {
                  return this.handlerfun(childrenvalue)
                })
              }
              <Redirect push exact={true} strict={true} from={val.path} to={val.children[0].path} />
            </Switch>
          </val.component>
        )
      }} />
    } else {
      return <Route key={val.path} exact={true} strict={true} path={val.path} component={val.component} />
    }
  }
  render() {
    let element = this.state.routes.map((value) => { return this.handlerfun(value); });
    return (
      <RootBox>
        <Router>
          <WGetHistory />
          <Suspense fallback={<></>}>
            <Switch>
              {element}
              <Route component={NotFoun} />
            </Switch>
          </Suspense>
        </Router>
      </RootBox>
    )
  }
}
class GetHistory extends React.Component {
  constructor(props) {
    super(props);
    window.$Router = this.props;
    this.routingToIntercept(this.props.history.location.pathname);
    this.props.history.listen((res) => {
      this.routingToIntercept(res.pathname)
    })
  }
  routingToIntercept = (pathname) => {
    if (pathname == '/personal') {
      cookieStore.get('token').then((res) => {
        if (!res) {
          window.$Router.history.push('/');
        }
      })
    }
  }
  render() {
    return null;
  }
}
let WGetHistory = withRouter(GetHistory);
export default BasicRouter;