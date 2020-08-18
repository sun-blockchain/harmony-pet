import { combineReducers } from 'redux';
import tomoReducer from './tomoReducer';

const rootReducer = combineReducers({
  tomo: tomoReducer
});

export default rootReducer;
