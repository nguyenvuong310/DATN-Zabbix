// redux/reducer/cameraReducer.js
import {
  FETCH_CAMERAS_REQUEST,
  FETCH_CAMERAS_SUCCESS,
  FETCH_CAMERAS_FAILURE,
} from "../action/cameraAction";

const initialState = {
  cameras: [],
  loading: false,
  error: null,
};

const cameraReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAMERAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CAMERAS_SUCCESS:
      return {
        ...state,
        loading: false,
        cameras: action.payload,
      };
    case FETCH_CAMERAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cameraReducer;
