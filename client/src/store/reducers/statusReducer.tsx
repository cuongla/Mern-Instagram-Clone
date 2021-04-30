import { ProfileActions, profile_types } from '../types/userTypes';

const initialState: boolean = false;

const statusReducer = (state = initialState, action: ProfileActions) => {
    switch(action.type) {
        case profile_types.STATUS:
            return action.payload;
        default:
            return state;
    }
}

export default statusReducer;