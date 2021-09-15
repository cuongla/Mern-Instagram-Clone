import { PostAction, IPostState, post_constants } from 'typings/postTypes';
import { editData } from '../../actions/globalActions';

const initialState: IPostState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2,
};

const authReducer = (state = initialState, action: PostAction) => {
    switch (action.type) {
        case post_constants.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case post_constants.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            }
        case post_constants.GET_POSTS:
            return {
                ...state,
                result: action.payload.result,
                page: action.payload.page,
                posts: action.payload.posts
            }
        case post_constants.UPDATE_POST:
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