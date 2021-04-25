export const profile_types = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER'
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
}

export interface Profile extends User {
    mobile: string
    story: string
    website: string
    address: string
    followers: Profile[]
    followings: Profile[]
}

export interface ProfileState {
    users: Profile[]
    posts?: any
    loading: boolean
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

export type ProfileActions = SetLoadingUserAction | GetUserAction;