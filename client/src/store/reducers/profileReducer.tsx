import { ProfileActions, ProfileState, profile_types } from '../types/userTypes';
import { editData } from '../actions/globalActions';

const initialState: ProfileState = {
    users: [],
    posts: [],
    loading: false,
};

const profileReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type) {
        case profile_types.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case profile_types.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            }
        case profile_types.FOLLOW:
            return {
                ...state,
                users: editData(state.users, action.payload._id, action.payload)
            }
        case profile_types.UNFOLLOW:
            return {
                ...state,
                users: editData(state.users, action.payload._id, action.payload)
            }
        default:
            return state;
    }
}

export default profileReducer;