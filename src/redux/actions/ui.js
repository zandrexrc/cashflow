export const setActiveWindow = id => ({
    type: "SET_ACTIVE_WINDOW",
    payload: id
});

export const toggleIsFetching = status => ({
    type: "TOGGLE_IS_FETCHING",
    payload: status
});

export const setDataIsLoaded = () => ({
    type: "SET_DATA_IS_LOADED",
    payload: true,
});

export const setError = error => ({
    type: "SET_ERROR",
    payload: error
});