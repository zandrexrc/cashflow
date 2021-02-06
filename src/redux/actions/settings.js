import fetch from 'cross-fetch';

import {GET_SETTINGS, EDIT_SETTINGS} from '../../constants';
import {toggleIsFetching, setError, showToast} from './ui';


export function getSettings() {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const res = await fetch('/api/settings');
        const payload = await res.json();

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: GET_SETTINGS,
          payload: payload,
        });
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };
}

export function editSettings(newSettings) {
  return async (dispatch, getState) => {
    if (!getState().isFetching) {
      dispatch(toggleIsFetching(true));
      try {
        const res = await fetch(
            `/api/settings`,
            {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(newSettings),
            },
        );
        const payload = await res.json();

        if (payload.error) {
          throw (payload.error);
        }

        dispatch(toggleIsFetching(false));
        dispatch({
          type: EDIT_SETTINGS,
          payload: payload,
        });
        dispatch(showToast('Settings saved', 'success'));
      } catch (error) {
        dispatch(setError(error));
      }
    }
  };
};
