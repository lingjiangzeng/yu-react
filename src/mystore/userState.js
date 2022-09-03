const defalutValue = {
  islogin: false,
  shopcart: [],
};
const userState = (state = defalutValue, action) => {
  switch (action.type) {
    case 'login':
      return login(state, action.params);
    case 'logout':
      return logout(state)
    case 'setshopcart':
      return setshopcart(state, action.params)
    default:
      return state
  }
}

const login = (state, params) => {
  state.islogin = params.islogin;
  return JSON.parse(JSON.stringify(state));

}
const logout = (state,) => {
  state.islogin = false;
  return JSON.parse(JSON.stringify(state));

}
const setshopcart = (state, params) => {
  state.shopcart = params.shopcart;
  return JSON.parse(JSON.stringify(state));

}
export default userState;
