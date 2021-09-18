import { UserPayload } from './userTypes';

export enum AuthTypes {
    AUTH = 'AUTH'
}

export interface AuthState {
    user: UserPayload | null
    token: string
}

export interface AuthPayload {
    msg: string
    access_token: string,
    user: any
}

export interface RegisterInputs {
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
    type: typeof AuthTypes.AUTH
    payload: AuthPayload
}

export type AuthAction = SetAuthAction;