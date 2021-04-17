export const notifyTypes = {
    NOTIFY: 'NOTIFY',
}

// actions
interface SetNotifyAction {
    type: typeof notifyTypes.NOTIFY
    payload: string
}

export type NotifyActions = SetNotifyAction;