import { PostAction, PostState, post_types } from 'store/types/postTypes';
import { editData } from '../actions/globalActions';

const initialState: PostState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2
};

const authReducer = (state = initialState, action: PostAction) => {
    switch (action.type) {
        case post_types.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case post_types.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            }
        case post_types.GET_POSTS:
            return {
                ...state,
                result: action.payload.result,
                page: action.payload.page,
                posts: action.payload.posts
            }
        case post_types.UPDATE_POST:
            return {
                ...state,
                posts: editData(
                    state.posts, 
                    action.payload._id, 
                    action.payload
                )
            }
        default:
            return state;
    }
}

export default authReducer;