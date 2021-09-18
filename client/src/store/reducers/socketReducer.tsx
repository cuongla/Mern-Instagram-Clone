import { GlobalActions, GlobalTypes } from 'types/globalTypes';

const socketReducer = (state = [], action: GlobalActions) => {
    switch (action.type) {
        case GlobalTypes.SOCKET:
            return action.payload;
        default:
            return state;
    }
}


export default socketReducer;