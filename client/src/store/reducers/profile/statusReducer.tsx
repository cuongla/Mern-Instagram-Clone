import { ProfileActions, UserTypes } from 'types/userTypes';

const initialState: boolean = false;

const statusReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type) {
        case UserTypes.STATUS:
            return action.payload;
        default:
            return state;
    }
}

export default statusReducer;