import { AuthAction, authTypes } from '../types/authTypes';

const initialState = {};

const authReducer = (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case authTypes.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;