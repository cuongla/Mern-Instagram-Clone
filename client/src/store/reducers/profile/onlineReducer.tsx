import { ProfileActions, user_constants } from 'typings/userTypes';

const onlineReducer = (state = [], action: ProfileActions) => {
    switch (action.type) {
        case user_constants.ONLINE:
            return [...state, action.payload];
        case user_constants.OFFLINE:
            return state.filter(item => item !== action.payload)
        default:
            return state;
    }
}


export default onlineReducer;