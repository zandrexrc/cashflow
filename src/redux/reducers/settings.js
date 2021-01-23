const initialState = {
    currency: 'NOK',
    dateFormat: 'dd.MM.yyyy',
    appTheme: 'light'
};

export const settings = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SETTINGS":
            return action.payload
        case "EDIT_SETTINGS":
            return action.payload
        default:
            return state
    }
};