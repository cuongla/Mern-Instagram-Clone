import { GlobalActions, GlobalTypes, AlertState } from 'types/globalTypes';

const initialState: AlertState = {
    msg: '',
    loading: false,
    error: '',
    errMsg: {}
};

const notifyReducer = (state = initialState, action: GlobalActions) => {
    switch (action.type) {
        case GlobalTypes.ALERT:
            return action.payload;
        default:
            return state;
    }
}

export default notifyReducer;