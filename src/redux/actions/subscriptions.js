import fetch from 'cross-fetch';
import { toggleIsFetching, setError, showToast } from './ui';
import { calcNextBillingDate } from '../../utils';


export function getSubscriptions() {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch('/api/subscriptions');
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                // Calculate next billing date
                for (let i = 0; i < payload.length; i++) {
                    const nextBillingDate = calcNextBillingDate(payload[i].firstBillingDate, payload[i].cycle);
                    payload[i] = { ...payload[i], nextBillingDate };
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "GET_SUBSCRIPTIONS",
                    payload: payload
                });
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
}

export function addSubscription(newSubscription) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(
                    '/api/subscriptions', 
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newSubscription)
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                // Calculate next billing date
                const nextBillingDate = calcNextBillingDate(payload.firstBillingDate, payload.cycle);
                const subscription = { ...payload, nextBillingDate }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "ADD_SUBSCRIPTION",
                    payload: subscription
                });
                dispatch(showToast("Successfully added subscription", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export function editSubscription(id, newSubscription) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(`/api/subscriptions/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSubscription)
                });
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                // Calculate next billing date
                const nextBillingDate = calcNextBillingDate(payload.firstBillingDate, payload.cycle);
                const subscription = { ...payload, nextBillingDate }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "EDIT_SUBSCRIPTION",
                    payload: subscription
                });
                dispatch(showToast("Successfully edited subscription", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export function deleteSubscription(id) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true)); 
            try {
                const res = await fetch(
                    `/api/subscriptions/${id}`, 
                    { method: 'DELETE' }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "DELETE_SUBSCRIPTION",
                    payload: payload.subscriptionId
                });
                dispatch(showToast("Successfully deleted subscription", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};

export function addMultipleSubscriptions(newSubscriptions) {
    return async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(toggleIsFetching(true));
            try {
                const res = await fetch(
                    '/api/subscriptions-group', 
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newSubscriptions)
                    }
                );
                const payload = await res.json();

                if (payload.error) {
                    throw (payload.error);
                }

                // Calculate next billing dates
                for (let i = 0; i < payload.length; i++) {
                    let nextBillingDate = calcNextBillingDate(payload[i].firstBillingDate, payload[i].cycle);
                    payload[i] = { ...payload[i], nextBillingDate };
                }

                dispatch(toggleIsFetching(false));
                dispatch({
                    type: "ADD_MULTIPLE_SUBSCRIPTIONS",
                    payload: payload
                });
                dispatch(showToast("Successfully added subscription", "success"));
            }
            catch (error) {
                dispatch(setError(error));
            }
        }
    }
};