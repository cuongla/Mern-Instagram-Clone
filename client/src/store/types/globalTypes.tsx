export const global_types = {
    THEME: 'THEME',
    MODAL: 'MODAL',
    ALERT: 'ALERT'
}

// Theme
interface SetThemeAction {
    type: typeof global_types.THEME
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
    type: typeof global_types.ALERT
    payload: AlertState
}


// Modal 
interface OpenModalAction {
    type: typeof global_types.MODAL
    payload: boolean
}

export type GlobalActions = SetAlertAction | SetThemeAction | OpenModalAction;