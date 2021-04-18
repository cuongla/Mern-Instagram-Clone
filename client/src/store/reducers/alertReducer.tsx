import { AlertActions, AlertState, ALERT } from '../types/alertTypes';

const initialState: AlertState = {
    msg: '',
    loading: false,
    error: ''
};

const notifyReducer = (state = initialState, action: AlertActions) => {
    switch(action.type) {
        case ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default notifyReducer;