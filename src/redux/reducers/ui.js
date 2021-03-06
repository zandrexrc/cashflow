import {
  SET_ACTIVE_PAGE,
  TOGGLE_IS_FETCHING,
  SET_DATA_IS_LOADED,
  SET_ERROR,
  SHOW_TOAST,
  HIDE_TOAST,
} from '../../constants';

export const activePage = (state = 0, action) => {
  return action.type === SET_ACTIVE_PAGE ? action.payload : state;
};

export const isFetching = (state = false, action) => {
  return action.type === TOGGLE_IS_FETCHING ? action.payload : state;
};

export const dataIsLoaded = (state = false, action) => {
  return action.type === SET_DATA_IS_LOADED ? true : state;
};

export const error = (state = null, action) => {
  return action.type === SET_ERROR ? action.payload : state;
};

// UI COMPONENTS
const initialToastState = {
  isOpen: false,
  message: '',
  severity: 'success',
};

export const toastState = (state = initialToastState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        isOpen: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case HIDE_TOAST:
      return {...state, isOpen: false};
    default:
      return state;
  }
};
