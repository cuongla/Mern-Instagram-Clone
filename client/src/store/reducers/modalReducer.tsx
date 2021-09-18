import { GlobalActions, GlobalTypes } from 'types/globalTypes';


const initialState: boolean = false;

const modalReducer = (state = initialState, action: GlobalActions) => {
    switch (action.type) {
        case GlobalTypes.MODAL:
            return action.payload;
        default:
            return state;
    }
}

export default modalReducer;