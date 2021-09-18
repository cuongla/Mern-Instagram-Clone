import { ProfileActions, ProfileState, user_constants } from 'types/userTypes';
import { editData } from '../../actions/globalActions';


const initialState: ProfileState = {
    users: [],
    posts: [],
    loading: false,
    ids: [],
    profile: null
};

const profileReducer = (state = initialState, action: ProfileActions) => {
    switch (action.type) {
        case user_constants.USER_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case user_constants.GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case user_constants.FOLLOW:
            return {
                ...state,
                users: editData(state.users, action.payload._id, action.payload)
            }
        case user_constants.UNFOLLOW:
            return {
                ...state,
                users: editData(state.users, action.payload._id, action.payload)
            }
        case user_constants.GET_IDS:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            }
        case user_constants.GET_USER_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;