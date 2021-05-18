import { ProfileActions, profile_types } from '../../types/userTypes';

const onlineReducer = (state = [], action: ProfileActions) => {
    switch (action.type){
        case profile_types.ONLINE:
            return [...state, action.payload];
        case profile_types.OFFLINE:
            return state.filter(item => item !== action.payload)
        default:
            return state;
    }
}


export default onlineReducer;