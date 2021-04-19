import { User } from './userTypes';

export const authTypes = {
    AUTH: 'AUTH',
}

export interface AuthState {
    user: User | null
    token: string
}

export interface RegisterData {
    fullname: string
    username: string
    email: string
    password: string
    confirmPassword?: string
    gender?: string
}

export interface LoginData {
    email: string,
    password: string
}


// actions
interface SetAuthAction {
    type: typeof authTypes.AUTH
    payload: any
}

export type AuthAction = SetAuthAction;