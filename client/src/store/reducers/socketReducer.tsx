import { GlobalActions, global_types } from '../types/globalTypes';

const socketReducer = (state = [], action: GlobalActions) => {
    switch (action.type) {
        case global_types.SOCKET:
            return action.payload;
        default:
            return state;
    }
}


export default socketReducer;