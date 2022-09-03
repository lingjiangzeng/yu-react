import { combineReducers, createStore } from 'redux'
import userState from './userState.js'
import resize from './resize.js'

const redener = combineReducers({
  userState: userState,
  resize:resize
});
export default createStore(redener);