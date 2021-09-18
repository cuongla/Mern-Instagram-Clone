import { RegisterInput } from './auth.types';
import { IPost } from './post.types';

export enum UserTypes {
    USER_LOADING = 'USER_LOADING',
    GET_PROFILE = 'GET_PROFILE',
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    STATUS = 'STATUS',
    GET_IDS = 'GET_IDS',
    GET_USER_POSTS = 'GET_USER_POSTS'
}

export enum SuggestionTypes {
    SUGGESSTION_FRIENDS_LOADING = 'SUGGESSTION_FRIENDS_LOADING',
    GET_SUGGESSTION_FRIENDS = 'GET_SUGGESSTION_FRIENDS',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface IUserProfile extends RegisterInput {
    avatar: string | File
    posts: IPost[]
    loading: boolean
    ids: string[]
}

export interface IUser extends RegisterInput {
    gender: string
    avatar: string
    mobile: string
    story: string
    website: string
    address: string
    followers: IUserProfile[]
    following: IUserProfile[]
    savedPost: IPost[]
}