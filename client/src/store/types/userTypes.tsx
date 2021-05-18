import { PostData } from './postTypes';

export const profile_types = {
    LOADING: 'LOADING',
    GET_PROFILE: 'GET_PROFILE',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    STATUS: 'STATUS',
    GET_IDS: 'GET_IDS',
    GET_USER_POSTS: 'GET_USER_POSTS',
    GET_SUGGESSTION_USERS: 'GET_SUGGESSTION_USERS',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export interface User {
    _id: string
    id: string
    fullname: string
    username: string
    email: string
    password: string
    gender: string
    avatar: string
    followers: Profile[]
    following: Profile[]
}

export interface Profile extends User {
    mobile: string
    story: string
    website: string
    address: string
}

export interface ProfileState {
    users: Profile[]
    posts?: any
    loading: boolean
    ids: string[]
}

export interface Suggestion_State {
    users: Profile[]
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


// actions
interface SetLoadingUserAction {
    type: typeof profile_types.LOADING,
    payload: boolean
}

interface GetUserAction {
    type: typeof profile_types.GET_PROFILE,
    payload: any
}

interface FollowUserAction {
    type: typeof profile_types.FOLLOW,
    payload: any
}

interface UnfollowUserAction {
    type: typeof profile_types.UNFOLLOW,
    payload: any
}

interface StatusAction {
    type: typeof profile_types.STATUS,
    payload: boolean
}

interface GetUserIdAction {
    type: typeof profile_types.GET_IDS,
    payload: string[]
}

interface GetUserPostsAction {
    type: typeof profile_types.GET_USER_POSTS,
    payload: PostData[]
}

interface GetSuggestionUsersAction {
    type: typeof profile_types.GET_SUGGESSTION_USERS,
    payload: User[]
}

interface UserOnlineAction {
    type: typeof profile_types.ONLINE,
    payload: User[]
}

interface UserOfflineAction {
    type: typeof profile_types.OFFLINE,
    payload: User[]
}

export type ProfileActions = SetLoadingUserAction | GetUserAction | FollowUserAction | UnfollowUserAction | StatusAction | GetUserIdAction | GetUserPostsAction | GetSuggestionUsersAction | UserOnlineAction | UserOfflineAction;