const editAccount = (items, newItem) => {
    let updatedItems = [...items];
    let index = updatedItems.findIndex(a => a.accountID === newItem.accountID);
    updatedItems[index] = newItem;
    return updatedItems;
};

const updateBalance = (items, id, amount) => {
    let account = items.find(a => a.accountID === id);
    account.balance += amount;
    return editAccount(items, account);
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
        case "UPDATE_ACCOUNT_BALANCE":
            return updateBalance(state, action.payload.id, action.payload.amount)
        default:
            return state
    }
};