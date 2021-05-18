import { DiscoverActions, DiscoverState, discover_types } from "store/types/discoverTypes";

const initialState: DiscoverState = {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false
}

const discoverReducer = (state = initialState, action: DiscoverActions) => {
    switch (action.type) {
        case discover_types.LOADING_DISCOVER:
            return {
                ...state,
                loading: action.payload
            }
        case discover_types.GET_DISCOVER_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            }
        case discover_types.UPDATE_DISCOVER_POSTS:
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
