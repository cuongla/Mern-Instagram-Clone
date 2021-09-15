export const global_constants = {
    THEME: 'THEME',
    MODAL: 'MODAL',
    ALERT: 'ALERT',
    LOADING: 'LOADING',
    SOCKET: 'SOCKET'
}

// Theme
interface SetThemeAction {
    type: typeof global_constants.THEME
    payload: boolean
}

// Alert
export interface AlertState {
    msg: string
    error: string
    loading: boolean
    errMsg: any
}

interface SetAlertAction {
    type: typeof global_constants.ALERT
    payload: AlertState
}


// Modal 
interface OpenModalAction {
    type: typeof global_constants.MODAL
    payload: boolean
}

// loading
interface LoadingAction {
    type: typeof global_constants.LOADING,
    payload: boolean
}

// Socket
interface SocketAction {
    type: typeof global_constants.SOCKET,
    payload: any
}

export type GlobalActions = SetAlertAction | SetThemeAction | OpenModalAction | LoadingAction | SocketAction;