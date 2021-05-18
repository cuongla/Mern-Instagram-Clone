import { User } from "./userTypes";

export const message_types = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CHATS: 'GET_CHATS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CHATS: 'DELETE_CHATS',
    ONLINE_STATUS: 'ONLINE_STATUS',
    CALL: 'CALL',
    PEER: 'PEER'
}

export interface MessageState {
    users: User[]
    resultUsers: number
    data: any
    firstLoad: boolean
}

// actions
interface AddUserAction {
    type: typeof message_types.ADD_USER,
    payload: User[]
}

interface AddMessageAction {
    type: typeof message_types.ADD_MESSAGE,
    payload: any
}

interface GetChatsAction {
    type: typeof message_types.GET_CHATS,
    payload: MessageState
}

interface GetMessagesAction {
    type: typeof message_types.GET_MESSAGES,
    payload: any
}

interface UpdateMessagesAction {
    type: typeof message_types.UPDATE_MESSAGES,
    payload: any
}

interface DeleteMessagesAction {
    type: typeof message_types.DELETE_MESSAGES,
    payload: any
}

interface DeleteChatAction {
    type: typeof message_types.DELETE_CHATS,
    payload: MessageState
}

interface CheckOnlineStatusAction {
    type: typeof message_types.ONLINE_STATUS,
    payload: User[]
}

interface CallAction {
    type: typeof message_types.CALL,
    payload: any
}

interface PeerAction {
    type: typeof message_types.PEER,
    payload: any
}

export type MessageActions = AddUserAction | AddMessageAction | GetChatsAction | GetMessagesAction | UpdateMessagesAction | DeleteMessagesAction | DeleteChatAction | CheckOnlineStatusAction | CallAction | PeerAction;