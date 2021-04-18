export const ALERT = 'ALERT';

export interface AlertState {
    msg?: string
    error?: string
    loading?: boolean
}

// actions
interface SetAlertAction {
    type: typeof ALERT
    payload: AlertState
}

export type AlertActions = SetAlertAction;