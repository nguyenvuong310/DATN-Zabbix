import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import bankReducer from './bankReducer';
import cameraReducer from "./cameraReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  banks: bankReducer,
  cameras: cameraReducer,
});

export default rootReducer;
