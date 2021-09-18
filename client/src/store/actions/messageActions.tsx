import { Dispatch } from 'react';
import { deleteDataAPI, getDataAPI, postDataAPI } from 'utils/fetchData';
import { deleteData } from 'store/actions/globalActions';
import { Socket } from 'socket.io-client';

// types
import { GlobalTypes } from 'types/globalTypes';
import { MessageActions, MessageTypes } from 'types/messageTypes';
import { AuthState } from 'types/authTypes';
import { UserProfile } from 'types/userTypes';

export const addMessage = (msg: any, auth: AuthState, socket: Socket) => async (dispatch: Dispatch<MessageActions>) => {
    dispatch({
        type: MessageTypes.ADD_MESSAGE,
        payload: msg
    });

    const { _id, avatar, fullname, username } = auth.user as UserProfile;
    socket.emit('addMessage', { ...msg, user: { _id, avatar, fullname, username } })

    try {
        await postDataAPI('message', msg, auth.token);
    } catch (err) {
        dispatch({
            type: GlobalTypes.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getChats = (auth: AuthState, page: number = 1) => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const res = await getDataAPI(`chats?limit=${page * 9}`, auth.token)

        let newArr: any = [];

        res.data.chats.forEach((item: any) => {
            item.recipients.forEach((cv: any) => {
                if (cv._id !== auth.user!._id) {
                    newArr.push({ ...cv, text: item.text, media: item.media, call: item.call })
                }
            })
        })

        dispatch({
            type: MessageTypes.GET_CHATS,
            payload: { newArr, result: res.data.result }
        })

    } catch (err) {
        dispatch({ type: GlobalTypes.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getMessages = (auth: AuthState, id: string, page: number = 1) => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = { ...res.data, messages: res.data.messages.reverse() }

        dispatch({ type: MessageTypes.GET_MESSAGES, payload: { ...newData, _id: id, page } })
    } catch (err) {
        dispatch({ type: GlobalTypes.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const loadMoreMessages = (auth: AuthState, id: string, page: number = 1) => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = { ...res.data, messages: res.data.messages.reverse() }

        dispatch({ type: MessageTypes.UPDATE_MESSAGES, payload: { ...newData, _id: id, page } })
    } catch (err) {
        dispatch({ type: GlobalTypes.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteMessages = (msg: any, data: any, auth: AuthState) => async (dispatch: Dispatch<MessageActions>) => {
    const newData = deleteData(data, msg._id);

    dispatch({ type: MessageTypes.DELETE_MESSAGES, payload: { newData, _id: msg.recipient } })
    try {
        await deleteDataAPI(`message/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({ type: GlobalTypes.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteChat = (auth: AuthState, id: string) => async (dispatch: Dispatch<MessageActions>) => {
    dispatch({ type: MessageTypes.DELETE_CHAT, payload: id })
    try {
        await deleteDataAPI(`chat/${id}`, auth.token)
    } catch (err) {
        dispatch({ type: GlobalTypes.ALERT, payload: { error: err.response.data.msg } })
    }
}