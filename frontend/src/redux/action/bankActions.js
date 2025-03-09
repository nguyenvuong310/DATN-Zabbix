// src/redux/action/bankActions.js
import { getBankByUserId } from '../../services/bankService';
export const FETCH_BANKS_REQUEST = 'FETCH_BANKS_REQUEST';
export const FETCH_BANKS_SUCCESS = 'FETCH_BANKS_SUCCESS';
export const FETCH_BANKS_FAILURE = 'FETCH_BANKS_FAILURE';

export const fetchBanksRequest = () => ({
  type: FETCH_BANKS_REQUEST,
});

export const fetchBanksSuccess = (banks) => ({
  type: FETCH_BANKS_SUCCESS,
  payload: banks,
});

export const fetchBanksFailure = (error) => ({
  type: FETCH_BANKS_FAILURE,
  payload: error,
});

export const fetchBanks = (userId) => {
  return async (dispatch) => {
    dispatch(fetchBanksRequest());
    try {
      const response = await getBankByUserId(userId);
      dispatch(fetchBanksSuccess(response));
    } catch (error) {
      dispatch(fetchBanksFailure(error));
    }
  };
};

export const RESET_BANKS_STATE = 'RESET_BANKS_STATE';

export const resetBanksState = () => ({
  type: RESET_BANKS_STATE,
});
