import { PostData } from "./postTypes"

export const discover_types = {
    LOADING_DISCOVER: 'LOADING_DISCOVER',
    GET_DISCOVER_POSTS: 'GET_DISCOVER_POSTS',
    UPDATE_DISCOVER_POSTS: 'UPDATE_DISCOVER_POSTS'
}

// state
export interface DiscoverState {
    loading: false
    posts: PostData[]
    result: 9
    page: 2
    firstLoad: boolean
}

// actions
interface LoadingDiscoverAction {
    type: typeof discover_types.LOADING_DISCOVER,
    payload: any
}

interface GetDicoverPostsAction {
    type: typeof discover_types.GET_DISCOVER_POSTS,
    payload: DiscoverState
}

interface UpdateDicoverPostsAction {
    type: typeof discover_types.UPDATE_DISCOVER_POSTS,
    payload: DiscoverState
}

export type DiscoverActions = LoadingDiscoverAction | GetDicoverPostsAction | UpdateDicoverPostsAction;