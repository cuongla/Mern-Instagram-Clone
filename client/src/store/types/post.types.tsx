import { IUser, IUserProfile } from './user.types';

export enum SinglePostTypes {
    LOADING_POST = 'LOADING_POST',
    CREATE_POST = 'CREATE_POST',
    UPDATE_POST = 'UPDATE_POST',
    GET_POST = 'GET_POST'
}

export enum PostsTypes {
    LOADING_POSTS = 'LOADING_POSTS',
    GET_POSTS = 'GET_POSTS',
    GET_DISCOVER_POSTS = 'GET_DISCOVER_POSTS',
    UPDATE_DISCOVER_POSTS = 'UPDATE_DISCOVER_POSTS'
}

export interface IPost {
    _id: string
    content: string
    images: any[]
    likes: IUserProfile[]
    comments: IComment[]
    user: IUser
    createdAt?: Date | number
}

export interface IDiscoverPost {
    loading: false
    posts: IPost[]
    result: 9
    page: 2
    firstLoad: boolean
}

export interface IComment {
    tag: IUser
    content: string
    reply: object
    likes: IUser[]
    user: IUser
    createdAt?: Date | string
}

// actions
interface LoadingPostAction {
    type: typeof SinglePostTypes.LOADING_POST,
    payload: boolean
}

interface GetSinglePostAction {
    type: typeof SinglePostTypes.GET_POST,
    payload: IPost
}

interface CreatePostAction {
    type: typeof SinglePostTypes.CREATE_POST,
    payload: IPost

}

interface UpdatePostAction {
    type: typeof SinglePostTypes.UPDATE_POST,
    payload: IPost
}

interface LoadingPostsAction {
    type: typeof PostsTypes.LOADING_POSTS,
    payload: boolean
}

interface GetPostsAction {
    type: typeof PostsTypes.GET_POSTS,
    payload: IPost[]
}


interface GetDicoverPostsAction {
    type: typeof PostsTypes.GET_DISCOVER_POSTS,
    payload: IDiscoverPost
}

interface UpdateDicoverPostsAction {
    type: typeof PostsTypes.UPDATE_DISCOVER_POSTS,
    payload: IDiscoverPost
}

export type PostAction = LoadingPostAction | LoadingPostsAction | GetSinglePostAction | GetPostsAction | CreatePostAction | UpdatePostAction | GetDicoverPostsAction | UpdateDicoverPostsAction