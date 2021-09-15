import { IUserData } from "./userTypes";


export const post_constants = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
}

export interface IPostData {
    _id?: string
    content: string
    images: any[]
    likes: IUserData[]
    comments: CommentData[]
    user: IUserData
    createdAt?: Date | number
}

export interface IPostState {
    posts: IPostData[]
    result?: number
    page?: number
    loading: boolean
}

export interface IPostFetchData {
    msg: string
    result: number | null
    posts: IPostData[] | null
    newPost: IPostData | null
}

export interface PostFormData {
    content: string
    images: File[] | string[] | HTMLImageElement[]
    user: IUserData
}

interface CreatePostAction {
    type: typeof post_constants.CREATE_POST,
    payload: IPostFetchData

}

interface LoadingPostAction {
    type: typeof post_constants.LOADING_POST,
    payload: boolean
}

interface GetPostsAction {
    type: typeof post_constants.GET_POSTS,
    payload: IPostFetchData
}

interface UpdatePostAction {
    type: typeof post_constants.UPDATE_POST,
    payload: IPostFetchData
}

interface GetPostAction {
    type: typeof post_constants.GET_POST,
    payload: IPostData
}

// comments
export interface CommentData {
    tag: IUserData
    _id: string
    content: string
    reply: object
    likes: IUserData[]
    user: IUserData
    createdAt?: Date | number
}

export type PostAction = CreatePostAction | LoadingPostAction | GetPostsAction | UpdatePostAction | GetPostAction;