import { AuthAction, AuthState, authTypes } from '../../types/authTypes';

const initialState: AuthState = {
    user: null,
    token: ''
};

const authReducer = (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case authTypes.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;