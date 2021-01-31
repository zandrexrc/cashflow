import { GET_SETTINGS, EDIT_SETTINGS, InitialSettings } from '../../constants';

export const settings = (state = InitialSettings, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            return action.payload
        case EDIT_SETTINGS:
            return action.payload
        default:
            return state
    }
};