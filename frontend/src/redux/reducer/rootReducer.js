import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import bankReducer from './bankReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  banks: bankReducer,
});

export default rootReducer;
