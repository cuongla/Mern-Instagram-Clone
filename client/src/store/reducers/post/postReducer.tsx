import { PostAction, SinglePostTypes } from 'store/types/post.types';
import { editData } from 'store/actions/globalActions';

const initialState = {
    loading: false,
    posts: []
};

const postReducer = (state = initialState, action: PostAction) => {
    switch (action.type) {
        case SinglePostTypes.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            }
        case SinglePostTypes.GET_POST:
            // @ts-ignore
            return [...state, action.payload]
        case SinglePostTypes.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case SinglePostTypes.UPDATE_POST:
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

export default postReducer;