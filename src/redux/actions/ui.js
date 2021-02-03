import {
    SET_ACTIVE_PAGE,
    TOGGLE_IS_FETCHING,
    SET_DATA_IS_LOADED,
    SET_ERROR,
    SHOW_TOAST,
    HIDE_TOAST
} from '../../constants';

export const setActivePage = id => ({
    type: SET_ACTIVE_PAGE,
    payload: id
});

export const toggleIsFetching = status => ({
    type: TOGGLE_IS_FETCHING,
    payload: status
});

export const setDataIsLoaded = () => ({
    type: SET_DATA_IS_LOADED,
    payload: null,
});

export const setError = error => ({
    type: SET_ERROR,
    payload: error
});

export const showToast = (message, severity) => ({
    type: SHOW_TOAST,
    payload: {message, severity}
});

export const hideToast = () => ({
    type: HIDE_TOAST,
    payload: null
});