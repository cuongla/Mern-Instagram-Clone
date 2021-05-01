import { User } from "./userTypes";


export const post_types = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
}

export interface PostState {
    posts: PostData[]
    result?: number
    page?: number
    loading: boolean
}

export interface PostData {
    _id?: string
    content: string
    images: any[]
    likes?: User[]
    comments?: any[]
    user: User
    createdAt?: Date | number
}


export interface PostFormData {
    content: string
    images: any[]
    user: User
}

interface CreatePostAction {
    type: typeof post_types.CREATE_POST,
    payload: any

}

interface LoadingPostAction {
    type: typeof post_types.LOADING_POST,
    payload: boolean
}

interface GetPostsAction {
    type: typeof post_types.GET_POSTS,
    payload: PostState
}

export type PostAction = CreatePostAction | LoadingPostAction | GetPostsAction;