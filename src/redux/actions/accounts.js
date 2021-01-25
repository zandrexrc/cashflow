import fetch from 'cross-fetch';
import { toggleIsFetching, setError, showToast } from './ui';


export function getAccounts() {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch('/api/accounts');
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "GET_ACCOUNTS",
                    payload: payload
                });
            }
            catch (error) {
                dispatch(setError(error));
            }    
        }
    }
}

export function addAccount(newAccount) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true)); 
            try {
                const res = await fetch(
                    '/api/accounts', 
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newAccount)
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "ADD_ACCOUNT",
                    payload: payload
                });
                dispatch(showToast("Successfully added account", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export function editAccount(id, newAccount) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(
                    `/api/accounts/${id}`, 
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newAccount)
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }
                
                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "EDIT_ACCOUNT",
                    payload: payload
                });
                dispatch(showToast("Successfully edited account", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export function deleteAccount(id) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(
                    `/api/accounts/${id}`, 
                    { method: 'DELETE' }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "DELETE_TRANSACTIONS_IN_ACCOUNT",
                    payload: payload.accountId
                });
                dispatch({
                    type: "DELETE_SUBSCRIPTIONS_IN_ACCOUNT",
                    payload: payload.accountId
                });
                dispatch({
                    type: "DELETE_ACCOUNT",
                    payload: payload.accountId
                });
                dispatch(showToast("Successfully deleted account", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export const updateAccountBalance = (id, amount) => ({
    type: "UPDATE_ACCOUNT_BALANCE",
    payload: {id, amount}
});