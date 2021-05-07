import { User } from "./userTypes";


export const post_types = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
}

// post
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
    likes: User[]
    comments: CommentData[]
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

interface UpdatePostAction {
    type: typeof post_types.UPDATE_POST,
    payload: PostState
}

// comments
export interface CommentData {
    tag: User;
    _id: string
    content: string
    reply: object
    likes: User[]
    user: User
    createdAt?: Date | number
}

export type PostAction = CreatePostAction | LoadingPostAction | GetPostsAction | UpdatePostAction;