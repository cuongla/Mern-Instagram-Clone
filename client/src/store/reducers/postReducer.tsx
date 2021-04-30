import { PostAction, PostState, post_types } from 'store/types/postTypes';

const initialState: PostState = {
    posts: []
};

const authReducer = (state = initialState, action: PostAction) => {
    switch(action.type) {
        case post_types.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        default:
            return state;
    }
}

export default authReducer;