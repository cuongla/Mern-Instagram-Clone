import { ProfileActions, user_constants } from 'typings/userTypes';

const initialState: boolean = false;

const statusReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type) {
        case user_constants.STATUS:
            return action.payload;
        default:
            return state;
    }
}

export default statusReducer;