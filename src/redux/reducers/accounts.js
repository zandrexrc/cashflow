import {
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT_BALANCE,
  ADD_MULTIPLE_ACCOUNTS,
} from '../../constants';

const editAccount = (items, newItem) => {
  const updatedItems = [...items];
  const index = updatedItems.findIndex(
      (a) => a.accountId === newItem.accountId,
  );
  updatedItems[index] = newItem;
  return updatedItems;
};

const updateBalance = (items, id, amount) => {
  const account = items.find((a) => a.accountId === id);
  account.balance += amount;
  return editAccount(items, account);
};

export const accounts = (state = [], action) => {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.payload;
    case ADD_ACCOUNT:
      return [...state, action.payload];
    case EDIT_ACCOUNT:
      return editAccount(state, action.payload);
    case DELETE_ACCOUNT:
      return state.filter((a) => a.accountId !== action.payload);
    case UPDATE_ACCOUNT_BALANCE:
      return updateBalance(state, action.payload.id, action.payload.amount);
    case ADD_MULTIPLE_ACCOUNTS:
      return state.concat(action.payload);
    default:
      return state;
  }
};
