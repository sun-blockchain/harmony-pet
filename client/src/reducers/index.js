import { combineReducers } from 'redux';
import reducer from './harmonyReducer';

const rootReducer = combineReducers({
  harmony: reducer
});

export default rootReducer;
