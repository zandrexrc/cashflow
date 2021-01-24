const editSubscription = (items, newItem) => {
    let updatedItems = [...items];
    let index = updatedItems.findIndex(s => s.subscriptionId === newItem.subscriptionId);
    updatedItems[index] = newItem;
    return updatedItems;
};

export const subscriptions = (state = [], action) => {
    switch (action.type) {
        case "GET_SUBSCRIPTIONS":
            return action.payload
        case "ADD_SUBSCRIPTION":
            return [...state, action.payload]
        case "EDIT_SUBSCRIPTION":
            return editSubscription(state, action.payload)
        case "DELETE_SUBSCRIPTION":
            return state.filter(s => s.subscriptionId !== action.payload)
        case "DELETE_SUBSCRIPTIONS_IN_ACCOUNT":
            return state.filter(s => s.accountID !== action.payload)
        default:
            return state
    }
};