import { IUserProfile } from './user.types';

export enum AuthTypes {
    AUTH = 'AUTH'
}

export interface LoginInput {
    email: string
    password: string
}

export interface RegisterInput extends LoginInput {
    fullname: string
    username: string
    confirmPassword: string
    gender: string
    role: string
    updatedAt: string
    createdAt: string
}

export interface IAuth {
    msg?: string
    access_token?: string
    user?: IUserProfile
}

// actions
interface SetAuthAction {
    type: typeof AuthTypes.AUTH
    payload: IAuth
}

export type AuthAction = SetAuthAction;