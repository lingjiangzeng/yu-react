//用户有验证登录信息
const defalutValue = {
  size: window.innerWidth,
};
const resize = (state = defalutValue, action) => {
  switch (action.type) {
    case 'setsize':
      return setsize(state, action.params);
    default:
      return state
  }
}

const setsize = (state, params) => {
  state.size = params.size;
  return JSON.parse(JSON.stringify(state));

}
export default resize;
