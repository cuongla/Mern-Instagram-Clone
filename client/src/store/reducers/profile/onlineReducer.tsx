import { UserActions, UserTypes } from 'types/userTypes';

const onlineReducer = (state = [], action: UserActions) => {
    switch (action.type) {
        case UserTypes.ONLINE:
            return [...state, action.payload];
        case UserTypes.OFFLINE:
            return state.filter(item => item !== action.payload)
        default:
            return state;
    }
}


export default onlineReducer;