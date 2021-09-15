import { GlobalActions, global_constants } from 'typings/globalTypes';

const socketReducer = (state = [], action: GlobalActions) => {
    switch (action.type) {
        case global_constants.SOCKET:
            return action.payload;
        default:
            return state;
    }
}


export default socketReducer;