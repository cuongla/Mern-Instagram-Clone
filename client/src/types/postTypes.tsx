import { UserPayload } from "./userTypes";

export enum PostTypes {
    LOADING_POSTS = 'LOADING_POSTS',
    LOADING_POST = 'LOADING_POST',
    CREATE_POST = 'CREATE_POST',
    GET_POSTS = 'GET_POSTS',
    UPDATE_POST = 'UPDATE_POST',
    GET_POST = 'GET_POST',
    GET_DISCOVER_POSTS = 'GET_DISCOVER_POSTS',
    UPDATE_DISCOVER_POSTS = 'UPDATE_DISCOVER_POSTS'
}

export interface PostPayload {
    _id?: string
    content: string
    images: any[]
    likes: UserPayload[]
    comments: CommentData[]
    user: UserPayload
    createdAt?: Date | number
}

export interface PostState {
    posts: PostPayload[]
    result?: number
    page?: number
    loading: boolean
}

export interface DiscoverState {
    loading: false
    posts: PostPayload[]
    result: 9
    page: 2
    firstLoad: boolean
}

export interface PostFetchData {
    msg: string
    result: number | null
    posts: PostPayload[] | null
    newPost: PostPayload | null
}

export interface PostInput {
    content: string
    images: File[] | string[] | HTMLImageElement[]
    user: UserPayload
}

interface CreatePostAction {
    type: typeof PostTypes.CREATE_POST,
    payload: PostFetchData

}

interface LoadingPostAction {
    type: typeof PostTypes.LOADING_POST,
    payload: boolean
}

interface LoadingPostsAction {
    type: typeof PostTypes.LOADING_POSTS,
    payload: boolean
}

interface GetPostsAction {
    type: typeof PostTypes.GET_POSTS,
    payload: PostState
}

interface UpdatePostAction {
    type: typeof PostTypes.UPDATE_POST,
    payload: PostPayload
}

interface GetPostAction {
    type: typeof PostTypes.GET_POST,
    payload: PostPayload
}

interface GetDicoverPostsAction {
    type: typeof PostTypes.GET_DISCOVER_POSTS,
    payload: DiscoverState
}

interface UpdateDicoverPostsAction {
    type: typeof PostTypes.UPDATE_DISCOVER_POSTS,
    payload: DiscoverState
}

export type PostAction = CreatePostAction | LoadingPostAction | LoadingPostsAction | GetPostsAction | UpdatePostAction | GetPostAction | GetDicoverPostsAction | UpdateDicoverPostsAction;