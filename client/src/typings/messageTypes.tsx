import { IUserData } from "./userTypes";

export const message_constants = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CHATS: 'GET_CHATS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CHAT: 'DELETE_CHAT',
    ONLINE_STATUS: 'ONLINE_STATUS',
    CALL: 'CALL',
    PEER: 'PEER'
}

export interface MessgeData {
    _id: string
    sender: IUserData
    recipient: IUserData[]
    text: string
    media: string
    call: Object
}

export interface ChatData {
    recipients: IUserData[]
    text: string
    media: any[]
    call: Object
}

export interface MessageState {
    users: IUserData[]
    resultUsers: number
    data: any
    firstLoad: boolean
}

// actions
interface AddUserAction {
    type: typeof message_constants.ADD_USER,
    payload: IUserData[]
}

interface AddMessageAction {
    type: typeof message_constants.ADD_MESSAGE,
    payload: any
}

interface GetChatsAction {
    type: typeof message_constants.GET_CHATS,
    payload: MessageState
}

interface GetMessagesAction {
    type: typeof message_constants.GET_MESSAGES,
    payload: any
}

interface UpdateMessagesAction {
    type: typeof message_constants.UPDATE_MESSAGES,
    payload: any
}

interface DeleteMessagesAction {
    type: typeof message_constants.DELETE_MESSAGES,
    payload: any
}

interface DeleteChatAction {
    type: typeof message_constants.DELETE_CHAT,
    payload: MessageState
}

interface CheckOnlineStatusAction {
    type: typeof message_constants.ONLINE_STATUS,
    payload: IUserData[]
}

interface CallAction {
    type: typeof message_constants.CALL,
    payload: any
}

interface PeerAction {
    type: typeof message_constants.PEER,
    payload: any
}

export type MessageActions = AddUserAction | AddMessageAction | GetChatsAction | GetMessagesAction | UpdateMessagesAction | DeleteMessagesAction | DeleteChatAction | CheckOnlineStatusAction | CallAction | PeerAction;