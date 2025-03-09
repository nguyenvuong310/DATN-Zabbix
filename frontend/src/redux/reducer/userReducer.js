import {
  FETCH_USER_LOGIN_SUCCESS,
  UPDATE_THREAD_ID_SUCCESS,
  TOGGLE_POLICY_ACCEPTED,
  LOG_OUT_USER_SUCCESS
} from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    id: "",
    threadId: "",
    name: "",
    email: "",
    avatar: "",
    policyAccepted: false,
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log("check actions:", action);
      return {
        ...state,
        account: {
          access_token: action?.payload?.accessToken,
          id: action?.payload?.user?.id,
          threadId: action?.payload?.user?.threadId,
          name: action?.payload?.user?.name,
          email: action?.payload?.user?.email,
          avatar: action?.payload?.user?.avatar,
          policyAccepted: action?.payload?.user?.policyAccepted || false,
        },
        isAuthenticated: true,
      };
    case LOG_OUT_USER_SUCCESS:
      console.log("check actions:", action);
      return {
        ...state,
        account: INITIAL_STATE.account,
        isAuthenticated: false,
      };
    case UPDATE_THREAD_ID_SUCCESS:
      console.log("check actions:", action);
      return {
        ...state,
        account: {
          ...state.account,
          threadId: action?.payload?.threadId,
        },
      };
    case TOGGLE_POLICY_ACCEPTED:
      return {
        ...state,
        account: {
          ...state.account,
          policyAccepted: true,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
