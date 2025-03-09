import { resetBanksState } from "./bankActions";
import { togglePolicyAccepted } from '../../services/userService';
export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const LOG_OUT_USER_SUCCESS = "LOG_OUT_USER_SUCCESS";
export const UPDATE_THREAD_ID_SUCCESS = "UPDATE_THREAD_ID_SUCCESS";
export const TOGGLE_POLICY_ACCEPTED = "TOGGLE_POLICY_ACCEPTED";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};
export const updateThreadIdSuccess = (threadId) => {
  return {
    type: UPDATE_THREAD_ID_SUCCESS,
    payload: {
      threadId,
    },
  };
};
export const doLogout = (data) => {
  return (dispatch) => {
    dispatch(resetBanksState());
    dispatch({
      type: LOG_OUT_USER_SUCCESS,
      payload: data,
    });
  };
};

export const togglePolicyAcceptedAction = (userId) => async (dispatch) => {
  try {
    await togglePolicyAccepted(userId);
    dispatch({
      type: TOGGLE_POLICY_ACCEPTED,
      payload: userId,
    });
  } catch (error) {
    console.error("Error updating policy acceptance:", error);
  }
};
