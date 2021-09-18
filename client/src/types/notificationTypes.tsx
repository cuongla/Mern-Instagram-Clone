import { UserPayload } from "./userTypes";

export enum NotificationTypes {
    GET_NOTIFICATIONS = 'GET_NOTIFICATIONS',
    CREATE_NOTIFICATION = 'CREATE_NOTIFICATIONS',
    REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATIONS',
    UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATIONS',
    DELETE_ALL_NOTIFICATIONS = 'DELETE_ALL_NOTIFICATIONS',
    UPDATE_SOUND = 'UPDATE_SOUND'
}

export interface NotificationPayload {
    _id: string
    id: string
    user?: UserPayload
    recipients: UserPayload[] | string[]
    url: string
    text: string
    content?: string
    image?: string
    isRead?: boolean
}

export interface NotificationState {
    loading: boolean
    data: NotificationPayload[]
    sound: boolean
}

// actions
interface GetNotificationsAction {
    type: typeof NotificationTypes.GET_NOTIFICATIONS,
    payload: NotificationPayload[] | any
}

interface CreateNotificationAction {
    type?: typeof NotificationTypes.CREATE_NOTIFICATION,
    payload?: NotificationPayload[]
}

interface RemoveNotificationAction {
    type?: typeof NotificationTypes.REMOVE_NOTIFICATION,
    payload?: NotificationPayload
}

interface UpdateNotificationAction {
    type: typeof NotificationTypes.UPDATE_NOTIFICATION,
    payload: NotificationPayload
}

interface UpdateSoundAction {
    type: typeof NotificationTypes.UPDATE_SOUND,
    payload: boolean
}

interface RemoveAllNotificationsAction {
    type: typeof NotificationTypes.DELETE_ALL_NOTIFICATIONS,
    payload: []
}

export type NotificationActions = GetNotificationsAction | CreateNotificationAction | RemoveNotificationAction | UpdateNotificationAction | UpdateSoundAction | RemoveAllNotificationsAction;