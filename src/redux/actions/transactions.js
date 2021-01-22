import fetch from 'cross-fetch';
import { toggleIsFetching, setError, showToast } from './ui';


export function getTransactions() {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true)); 
            try {
                const res = await fetch('/api/transactions');
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "GET_TRANSACTIONS",
                    payload: payload
                });
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
}

export function addTransaction(newTransaction) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(
                    '/api/transactions', 
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newTransaction)
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "ADD_TRANSACTION",
                    payload: payload
                });
                dispatch(showToast("Successfully added transaction", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export function editTransaction(id, newTransaction) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(
                    `/api/transactions/${id}`, 
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newTransaction)
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "EDIT_TRANSACTION",
                    payload: payload
                });
                dispatch(showToast("Successfully edited transaction", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export function deleteTransaction(id) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(
                    `/api/transactions/${id}`, 
                    { method: 'DELETE' }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "DELETE_TRANSACTION",
                    payload: payload.transactionID
                });
                dispatch(showToast("Successfully deleted transaction", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};