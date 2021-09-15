import { GlobalActions, global_constants } from 'typings/globalTypes';


const initialState: boolean = false;

const modalReducer = (state = initialState, action: GlobalActions) => {
    switch (action.type) {
        case global_constants.MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default modalReducer;