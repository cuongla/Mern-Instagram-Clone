import { ProfileActions, Suggestion_State, UserTypes } from 'types/userTypes';
import { GlobalTypes } from 'types/globalTypes'

const initialState: Suggestion_State = {
    loading: false,
    users: []
}


const suggestionsReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type) {
        case GlobalTypes.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case UserTypes.GET_SUGGESSTION_FRIENDS:
            return {
                ...state,
                users: action.payload.users
            };
        default:
            return state;
    }
}

export default suggestionsReducer;