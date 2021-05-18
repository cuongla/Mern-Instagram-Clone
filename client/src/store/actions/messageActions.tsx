import { Dispatch } from 'react';
import { AuthState } from 'store/types/authTypes';
import { Profile } from '../types/userTypes';
import { deleteDataAPI, getDataAPI, postDataAPI } from 'utils/fetchData';
import { global_types } from '../types/globalTypes';
import { deleteData } from 'store/actions/globalActions';
import { Socket } from 'socket.io-client';
import { MessageActions, message_types } from 'store/types/messageTypes';
import {} from '../types/userTypes';

export const addMessage = (msg: any, auth: AuthState, socket: Socket) => async (dispatch: Dispatch<MessageActions>) =>{
    dispatch({type: message_types.ADD_MESSAGE, payload: msg})

    const { _id, avatar, fullname, username } = auth.user as Profile;

    socket.emit('addMessage', {...msg, user: { _id, avatar,  fullname, username } })
    
    try {
        await postDataAPI('message', msg, auth.token)
    } catch (err) {
        dispatch({type: global_types.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getChats = (auth: AuthState, page: number = 1) => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const res = await getDataAPI(`chats?limit=${page * 9}`, auth.token)
        
        let newArr: any = [];

        res.data.chats.forEach((item: any) => {
            item.recipients.forEach((cv: any) => {
                if(cv._id !== auth.user!._id){
                    newArr.push({...cv, text: item.text, media: item.media, call: item.call})
                }
            })
        })

        dispatch({
            type: message_types.GET_CHATS, 
            payload: {newArr, result: res.data.result}
        })

    } catch (err) {
        dispatch({type: global_types.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const getMessages = (auth: AuthState, id: string, page: number = 1) => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = {...res.data, messages: res.data.messages.reverse()}

        dispatch({type: message_types.GET_MESSAGES, payload: {...newData, _id: id, page}})
    } catch (err) {
        dispatch({type: global_types.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const loadMoreMessages = (auth: AuthState, id: string, page: number = 1) => async (dispatch: Dispatch<MessageActions>) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = {...res.data, messages: res.data.messages.reverse()}

        dispatch({type: message_types.UPDATE_MESSAGES, payload: {...newData, _id: id, page}})
    } catch (err) {
        dispatch({type: global_types.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteMessages = (msg: any, data: any, auth: AuthState) => async (dispatch: Dispatch<MessageActions>) => {
    const newData = deleteData(data, msg._id);

    dispatch({type: message_types.DELETE_MESSAGES, payload: {newData, _id: msg.recipient}})
    try {
        await deleteDataAPI(`message/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({type: global_types.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteChat = (auth: AuthState, id: string) => async (dispatch: Dispatch<MessageActions>) => {
    dispatch({type: message_types.DELETE_CHAT, payload: id})
    try {
        await deleteDataAPI(`chat/${id}`, auth.token)
    } catch (err) {
        dispatch({type: global_types.ALERT, payload: {error: err.response.data.msg}})
    }
}