// redux/action/cameraActions.js
import axios from "axios";

// Action Types
export const FETCH_CAMERAS_REQUEST = "FETCH_CAMERAS_REQUEST";
export const FETCH_CAMERAS_SUCCESS = "FETCH_CAMERAS_SUCCESS";
export const FETCH_CAMERAS_FAILURE = "FETCH_CAMERAS_FAILURE";

// Action Creators
export const fetchCamerasRequest = () => ({
  type: FETCH_CAMERAS_REQUEST,
});

export const fetchCamerasSuccess = (cameras) => ({
  type: FETCH_CAMERAS_SUCCESS,
  payload: cameras,
});

export const fetchCamerasFailure = (error) => ({
  type: FETCH_CAMERAS_FAILURE,
  payload: error,
});

// Thunk to Fetch Cameras
export const fetchCameras = (filter = "") => {
  return async (dispatch) => {
    dispatch(fetchCamerasRequest());
    try {
      const response = await axios.get(`/api/cameras${filter ? `?filter=${filter}` : ""}`);
      dispatch(fetchCamerasSuccess(response.data));
    } catch (error) {
      dispatch(fetchCamerasFailure(error.message));
    }
  };
};