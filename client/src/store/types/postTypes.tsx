import { User } from "./userTypes";


export const post_types = {
    CREATE_POST: 'CREATE_POST'
}

export interface PostState {
    posts: PostData[]
    result?: number
    page?: number
}

export interface PostData {
    content: string
    images: any[]
    likes: User[]
    comments: any[]
    user: User
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

export type PostAction = CreatePostAction;