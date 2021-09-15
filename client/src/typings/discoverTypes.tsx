import { IPostData } from "./postTypes"

export const discover_constants = {
    LOADING_DISCOVER: 'LOADING_DISCOVER',
    GET_DISCOVER_POSTS: 'GET_DISCOVER_POSTS',
    UPDATE_DISCOVER_POSTS: 'UPDATE_DISCOVER_POSTS'
}

// state
export interface DiscoverState {
    loading: false
    posts: IPostData[]
    result: 9
    page: 2
    firstLoad: boolean
}

// actions
interface LoadingDiscoverAction {
    type: typeof discover_constants.LOADING_DISCOVER,
    payload: any
}

interface GetDicoverPostsAction {
    type: typeof discover_constants.GET_DISCOVER_POSTS,
    payload: DiscoverState
}

interface UpdateDicoverPostsAction {
    type: typeof discover_constants.UPDATE_DISCOVER_POSTS,
    payload: DiscoverState
}

export type DiscoverActions = LoadingDiscoverAction | GetDicoverPostsAction | UpdateDicoverPostsAction;