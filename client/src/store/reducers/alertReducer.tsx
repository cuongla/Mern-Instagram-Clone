import { GlobalActions, global_constants, AlertState } from 'typings/globalTypes';

const initialState: AlertState = {
    msg: '',
    loading: false,
    error: '',
    errMsg: {}
};

const notifyReducer = (state = initialState, action: GlobalActions) => {
    switch (action.type) {
        case global_constants.ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default notifyReducer;