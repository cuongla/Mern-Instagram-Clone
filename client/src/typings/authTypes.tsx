import { IUserData } from './userTypes';

export const auth_constants = {
    AUTH: 'AUTH'
}

export interface IAuthState {
    user: IUserData | null
    token: string
}

export interface IAuthData {
    msg: string
    access_token: string,
    user: any
}

export interface RegisterData {
    fullname: string
    username: string
    email: string
    password: string
    confirmPassword: string
    gender: string
}

export interface LoginData {
    email: string,
    password: string
}

// actions
interface SetAuthAction {
    type: typeof auth_constants.AUTH
    payload: IAuthData
}

export type AuthAction = SetAuthAction;