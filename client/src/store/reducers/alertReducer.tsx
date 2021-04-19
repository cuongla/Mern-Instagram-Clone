import { AlertActions, AlertState, ALERT } from '../types/alertTypes';

const initialState: AlertState = {
    msg: '',
    loading: false,
    error: '',
    errMsg: {}
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