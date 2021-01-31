import {
    GET_TRANSACTIONS,
    ADD_TRANSACTION,
    EDIT_TRANSACTION,
    DELETE_TRANSACTION,
    DELETE_TRANSACTIONS_IN_ACCOUNT,
    ADD_MULTIPLE_TRANSACTIONS
} from '../../constants';

const editTransaction = (items, newItem) => {
    let updatedItems = [...items];
    let index = updatedItems.findIndex(t => t.transactionId === newItem.transactionId);
    updatedItems[index] = newItem;
    return updatedItems;
};

export const transactions = (state = [], action) => {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return action.payload
        case ADD_TRANSACTION:
            return [...state, action.payload]
        case EDIT_TRANSACTION:
            return editTransaction(state, action.payload)
        case DELETE_TRANSACTION:
            return state.filter(t => t.transactionId !== action.payload)
        case DELETE_TRANSACTIONS_IN_ACCOUNT:
            return state.filter(t => t.accountId !== action.payload)
        case ADD_MULTIPLE_TRANSACTIONS:
            return state.concat(action.payload)
        default:
            return state
    }
};