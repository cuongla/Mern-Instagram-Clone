import { ProfileActions, ProfileState, profile_types } from '../types/userTypes';
import { editData } from '../actions/globalActions';

const initialState: ProfileState = {
    users: [],
    posts: [],
    loading: false,
    ids: []
};

const profileReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type) {
        case profile_types.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case profile_types.GET_PROFILE:
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
        case profile_types.GET_IDS:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            }
        case profile_types.GET_USER_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            }
        default:
            return state;
    }
}

export default profileReducer;