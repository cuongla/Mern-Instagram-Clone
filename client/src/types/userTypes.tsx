import { PostPayload } from './postTypes';

export enum UserTypes {
    USER_LOADING = 'USER_LOADING',
    GET_PROFILE = 'GET_PROFILE',
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    STATUS = 'STATUS',
    GET_IDS = 'GET_IDS',
    GET_USER_POSTS = 'GET_USER_POSTS',
    GET_SUGGESSTION_FRIENDS = 'GET_SUGGESSTION_FRIENDS',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface UserPayload {
    _id: string
    id: string
    fullname: string
    username: string
    email: string
    gender: string
    avatar: string
    followers: UserProfile[]
    following: UserProfile[]
    savedPost: PostPayload[]
}

export interface UserProfile extends UserPayload {
    mobile: string
    story: string
    website: string
    address: string
}

export interface ProfileState {
    users: UserProfile[]
    profile: UserProfile | null
    posts: PostPayload[]
    loading: boolean
    ids: string[]
}

export interface SuggestionState {
    users: UserPayload[]
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
    type: typeof UserTypes.USER_LOADING,
    payload: boolean
}

interface GetUserAction {
    type: typeof UserTypes.GET_PROFILE,
    payload: UserProfile
}

interface FollowUserAction {
    type: typeof UserTypes.FOLLOW,
    payload: IUserFetchData
}

interface UnfollowUserAction {
    type: typeof UserTypes.UNFOLLOW,
    payload: IUserFetchData
}

interface StatusAction {
    type: typeof UserTypes.STATUS,
    payload: boolean
}

interface GetUserIdAction {
    type: typeof UserTypes.GET_IDS,
    payload: string[]
}

interface GetUserPostsAction {
    type: typeof UserTypes.GET_USER_POSTS,
    payload: PostPayload[]
}

interface GetSuggestionUsersAction {
    type: typeof UserTypes.GET_SUGGESSTION_FRIENDS,
    payload: UserPayload[]
}

interface UserOnlineAction {
    type: typeof UserTypes.ONLINE,
    payload: UserPayload[]
}

interface UserOfflineAction {
    type: typeof UserTypes.OFFLINE,
    payload: UserPayload[]
}

export type UserActions = SetLoadingUserAction | GetUserAction | FollowUserAction | UnfollowUserAction | StatusAction | GetUserIdAction | GetUserPostsAction | GetSuggestionUsersAction | UserOnlineAction | UserOfflineAction;