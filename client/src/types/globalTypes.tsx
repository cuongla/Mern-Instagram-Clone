export enum GlobalTypes {
    THEME = 'THEME',
    MODAL = 'MODAL',
    ALERT = 'ALERT',
    LOADING = 'LOADING',
    SOCKET = 'SOCKET'
}

// Theme
interface SetThemeAction {
    type: typeof GlobalTypes.THEME
    payload: boolean
}

// Seartch 
export interface SearchResult {
    _id: string
    fullname: string
    username: string
    avatar: string
}

// Alert
export interface AlertState {
    msg: string
    error: string
    loading: boolean
    errMsg: any
}

interface SetAlertAction {
    type: typeof GlobalTypes.ALERT
    payload: { error: string }
}

// Modal 
interface OpenModalAction {
    type: typeof GlobalTypes.MODAL
    payload: boolean
}

// loading
interface LoadingAction {
    type: typeof GlobalTypes.LOADING,
    payload: boolean
}

// Socket
interface SocketAction {
    type: typeof GlobalTypes.SOCKET,
    payload: any
}

export type GlobalActions = SetAlertAction | SetThemeAction | OpenModalAction | LoadingAction | SocketAction;