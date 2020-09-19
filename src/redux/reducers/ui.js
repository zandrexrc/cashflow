export const activeWindow = (state = 0, action) => {
    return action.type === "SET_ACTIVE_WINDOW" ? action.payload : state;
};

export const isFetching = (state = false, action) => {
    return action.type === "TOGGLE_IS_FETCHING" ? action.payload : state;
};

export const dataIsLoaded = (state = false, action) => {
    return action.type === "SET_DATA_IS_LOADED" ? action.payload : state;
};

export const error = (state = null, action) => {
    return action.type === "SET_ERROR" ? action.payload : state;
};