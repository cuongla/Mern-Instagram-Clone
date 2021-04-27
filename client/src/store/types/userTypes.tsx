export const profile_types = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW'
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
    type: typeof profile_types.GET_USER,
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

export type ProfileActions = SetLoadingUserAction | GetUserAction | FollowUserAction | UnfollowUserAction;