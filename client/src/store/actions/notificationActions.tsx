import { Dispatch } from "react"
import { getDataAPI, patchDataAPI, postDataAPI, deleteDataAPI } from 'utils/fetchData';
import { Socket } from 'socket.io-client';

// types
import { AuthState } from "types/authTypes"
import { NotificationActions, NotificationPayload, NotificationTypes } from "types/notificationTypes";
import { GlobalTypes } from "types/globalTypes";


export const createNotification = (msg: NotificationPayload, auth: AuthState, socket: Socket) => async (dispatch: Dispatch<NotificationActions>) => {
    try {
        const res = await postDataAPI('notification', msg, auth.token);

        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: auth.user!.username,
                avatar: auth.user!.avatar
            }
        });
    } catch (err) {
        dispatch({
            type: GlobalTypes.ALERT,
            payload: { error: err.response.data.msg }

        })
    }
}

export const removeNotification = (msg: NotificationPayload, auth: AuthState, socket: Socket) => async (dispatch: Dispatch<NotificationActions>) => {
    try {
        await deleteDataAPI(`notification/${msg.id}?url=${msg.url}`, auth.token);

        socket.emit('removeNotify', msg)
    } catch (err) {
        dispatch({
            type: GlobalTypes.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getNotifications = (token: string) => async (dispatch: Dispatch<NotificationActions>) => {
    try {
        const res = await getDataAPI('notifications', token)

        dispatch({
            type: NotificationTypes.GET_NOTIFICATIONS,
            payload: res.data.notifies
        });
    } catch (err) {
        dispatch({
            type: GlobalTypes.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const isReadNotification = (msg: NotificationPayload, auth: AuthState) => async (dispatch: Dispatch<NotificationActions>) => {
    dispatch({
        type: NotificationTypes.UPDATE_NOTIFICATION,
        payload: { ...msg, isRead: true }
    })
    try {
        await patchDataAPI(`/isReadnotification/${msg._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GlobalTypes.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
}

export const deleteAllNotifications = (token: string) => async (dispatch: Dispatch<NotificationActions>) => {
    dispatch({
        type: NotificationTypes.DELETE_ALL_NOTIFICATIONS,
        payload: []
    })
    try {
        await deleteDataAPI('delete_all_notifications', token)
    } catch (err) {
        dispatch({
            type: GlobalTypes.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}