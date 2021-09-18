import { PostAction, DiscoverState, PostTypes } from "types/postTypes";

const initialState: DiscoverState = {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false
}

const discoverReducer = (state = initialState, action: PostAction) => {
    switch (action.type) {
        case PostTypes.LOADING_POSTS:
            return {
                ...state,
                loading: action.payload
            }
        case PostTypes.GET_DISCOVER_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            }
        case PostTypes.UPDATE_DISCOVER_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: state.page + 1
            }
        default:
            return state;
    }
}


export default discoverReducer;
