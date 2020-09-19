const editTransaction = (items, newItem) => {
    let updatedItems = [...items];
    let index = updatedItems.findIndex(t => t.transactionID === newItem.transactionID);
    updatedItems[index] = newItem;
    return updatedItems;
};

export const transactions = (state = [], action) => {
    switch (action.type) {
        case "GET_TRANSACTIONS":
            return action.payload
        case "ADD_TRANSACTION":
            return [...state, action.payload]
        case "EDIT_TRANSACTION":
            return editTransaction(state, action.payload)
        case "DELETE_TRANSACTION":
            return state.filter(t => t.transactionID !== action.payload)
        case "DELETE_TRANSACTIONS_IN_ACCOUNT":
            return state.filter(t => t.accountID !== action.payload)
        default:
            return state
    }
};