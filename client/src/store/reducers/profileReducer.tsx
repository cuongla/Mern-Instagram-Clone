import { ProfileActions, ProfileState, profile_types } from '../types/userTypes';

const initialState: ProfileState = {
    users: [],
    posts: [],
    loading: false,
};

const profileReducer = (state = initialState, action: ProfileActions) => {
    switch(action.type) {
        case profile_types.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case profile_types.GET_USER:
            console.log(action.payload.user);
            return {
                ...state,
                users: [...state.users, action.payload.user]
            }
        default:
            return state;
    }
}

export default profileReducer;