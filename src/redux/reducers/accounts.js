const editAccount = (items, newItem) => {
    let updatedItems = [...items];
    let index = updatedItems.findIndex(a => a.accountID === newItem.accountID);
    updatedItems[index] = newItem;
    return updatedItems;
};

export const accounts = (state = [], action) => {
    switch (action.type) {
        case "GET_ACCOUNTS":
            return action.payload
        case "ADD_ACCOUNT":
            return [...state, action.payload]
        case "EDIT_ACCOUNT":
            return editAccount(state, action.payload)
        case "DELETE_ACCOUNT":
            return state.filter(a => a.accountID !== action.payload)
        default:
            return state
    }
};