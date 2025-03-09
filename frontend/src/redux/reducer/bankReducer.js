// src/redux/reducer/bankReducer.js
import {
  FETCH_BANKS_REQUEST,
  FETCH_BANKS_SUCCESS,
  FETCH_BANKS_FAILURE,
  RESET_BANKS_STATE,
} from '../action/bankActions';

const INITIAL_STATE = {
  loading: false,
  bankAccounts: [],
  error: null,
};

const bankReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BANKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BANKS_SUCCESS:
      return {
        ...state,
        loading: false,
        bankAccounts: Array.isArray(action.payload) ? action.payload : [],
      };
    case FETCH_BANKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_BANKS_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default bankReducer;
