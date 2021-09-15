import { DiscoverActions, DiscoverState, discover_constants } from "typings/discoverTypes";

const initialState: DiscoverState = {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false
}

const discoverReducer = (state = initialState, action: DiscoverActions) => {
    switch (action.type) {
        case discover_constants.LOADING_DISCOVER:
            return {
                ...state,
                loading: action.payload
            }
        case discover_constants.GET_DISCOVER_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            }
        case discover_constants.UPDATE_DISCOVER_POSTS:
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
