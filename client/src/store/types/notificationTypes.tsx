import { User } from "./userTypes";

export const notification_types = {
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    CREATE_NOTIFICATION:     'CREATE_NOTIFICATIONS',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATIONS',
    UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATIONS',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFICATIONS:     'DELETE_ALL_NOTIFICATIONS',
}

export interface NotificationData {
    _id: string
    id: string
    user: User
    recipients: User[]
    url: string
    text: string
    content: string
    image: string
    isRead: boolean
}

export interface NotificationState {
    loading: boolean
    data: NotificationData[]
    sound: boolean
}

// actions
interface GetNotificationsAction {
    type: typeof notification_types.GET_NOTIFICATIONS,
    payload: NotificationData[]
}

interface CreateNotificationAction {
    type: typeof notification_types.CREATE_NOTIFICATION,
    payload: NotificationData[]
}

interface RemoveNotificationAction {
    type: typeof notification_types.REMOVE_NOTIFICATION,
    payload: NotificationData[]
}

interface UpdateNotificationAction {
    type: typeof notification_types.UPDATE_NOTIFICATION,
    payload: NotificationData
}

interface UpdateSoundAction {
    type: typeof notification_types.GET_NOTIFICATIONS,
    payload: boolean
}

interface RemoveAllNotificationsAction {
    type: typeof notification_types.DELETE_ALL_NOTIFICATIONS,
    payload: NotificationData
}

export type NotificationActions = GetNotificationsAction | CreateNotificationAction | RemoveNotificationAction | UpdateNotificationAction | UpdateSoundAction | RemoveAllNotificationsAction;