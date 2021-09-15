import { IPostData } from './postTypes';

export const user_constants = {
    USER_LOADING: 'USER_LOADING',
    GET_PROFILE: 'GET_PROFILE',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    STATUS: 'STATUS',
    GET_IDS: 'GET_IDS',
    GET_USER_POSTS: 'GET_USER_POSTS',
    GET_SUGGESSTION_FRIENDS: 'GET_SUGGESSTION_FRIENDS',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export interface IUserData {
    _id: string
    id: string
    fullname: string
    username: string
    email: string
    gender: string
    avatar: string
    followers: IProfile[]
    following: IProfile[]
    savedPost: IPostData[]
}

export interface IProfile extends IUserData {
    mobile: string
    story: string
    website: string
    address: string
}

export interface ProfileState {
    users: IProfile[]
    profile: IProfile | null
    posts: IPostData[]
    loading: boolean
    ids: string[]
}

export interface Suggestion_State {
    users: IUserData[]
    loading: boolean
}

export interface EditProfileData {
    fullname: string
    mobile: string
    address: string
    website: string
    story: string
    gender: string
}

interface IUserFetchData {
    _id: string
    msg: string
}


// actions
interface SetLoadingUserAction {
    type: typeof user_constants.USER_LOADING,
    payload: boolean
}

interface GetUserAction {
    type: typeof user_constants.GET_PROFILE,
    payload: IProfile
}

interface FollowUserAction {
    type: typeof user_constants.FOLLOW,
    payload: IUserFetchData
}

interface UnfollowUserAction {
    type: typeof user_constants.UNFOLLOW,
    payload: IUserFetchData
}

interface StatusAction {
    type: typeof user_constants.STATUS,
    payload: boolean
}

interface GetUserIdAction {
    type: typeof user_constants.GET_IDS,
    payload: string[]
}

interface GetUserPostsAction {
    type: typeof user_constants.GET_USER_POSTS,
    payload: IPostData[]
}

interface GetSuggestionUsersAction {
    type: typeof user_constants.GET_SUGGESSTION_FRIENDS,
    payload: IUserData[]
}

interface UserOnlineAction {
    type: typeof user_constants.ONLINE,
    payload: IUserData[]
}

interface UserOfflineAction {
    type: typeof user_constants.OFFLINE,
    payload: IUserData[]
}

export type ProfileActions = SetLoadingUserAction | GetUserAction | FollowUserAction | UnfollowUserAction | StatusAction | GetUserIdAction | GetUserPostsAction | GetSuggestionUsersAction | UserOnlineAction | UserOfflineAction;