import { AuthTypes, AuthAction } from 'store/types/auth.types';

const authReducer = (state = {}, action: AuthAction) => {
    switch (action.type) {
        case AuthTypes.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;