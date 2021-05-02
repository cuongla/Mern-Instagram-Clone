import { GlobalActions, global_types } from '../types/globalTypes';


const initialState: boolean = false;

const modalReducer = (state = initialState, action: GlobalActions) => {
    switch(action.type) {
        case global_types.MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default modalReducer;