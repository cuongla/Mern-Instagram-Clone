import { NotifyActions, notifyTypes } from '../types/notifyTypes';

const initialState = {};

const notifyReducer = (state = initialState, action: NotifyActions) => {
    switch(action.type) {
        case notifyTypes.NOTIFY:
            return action.payload;
        default:
            return state;
    }
}

export default notifyReducer;