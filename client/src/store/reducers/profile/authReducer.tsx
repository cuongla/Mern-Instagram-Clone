import { AuthAction, IAuthState, auth_constants } from 'typings/authTypes';

const initialState: IAuthState = {
    user: null,
    token: ''
};

const authReducer = (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case auth_constants.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;