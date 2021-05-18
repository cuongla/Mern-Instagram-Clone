import { profile_types, ProfileActions, Suggestion_State } from '../../types/userTypes';

const initialState: Suggestion_State = {
    loading: false,
    users: []
}


const suggestionsReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type){
        case profile_types.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case profile_types.GET_SUGGESSTION_USERS:
            return {
                ...state,
                users: action.payload.users
            };
        default:
            return state;
    }
}

export default suggestionsReducer;