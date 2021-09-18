import { UserPayload } from "./userTypes";

export enum MessageTypes {
    ADD_USER = 'ADD_USER',
    ADD_MESSAGE = 'ADD_MESSAGE',
    GET_CHATS = 'GET_CHATS',
    GET_MESSAGES = 'GET_MESSAGES',
    UPDATE_MESSAGES = 'UPDATE_MESSAGES',
    DELETE_MESSAGES = 'DELETE_MESSAGES',
    DELETE_CHAT = 'DELETE_CHAT',
    ONLINE_STATUS = 'ONLINE_STATUS',
    CALL = 'CALL',
    PEER = 'PEER'
}

export interface MessgeData {
    _id: string
    sender: UserPayload
    recipient: UserPayload[]
    text: string
    media: string
    call: Object
}

export interface ChatData {
    recipients: UserPayload[]
    text: string
    media: any[]
    call: Object
}

export interface MessageState {
    users: UserPayload[]
    resultUsers: number
    data: any
    firstLoad: boolean
    newArr: any
    result: any
}

// actions
interface AddUserAction {
    type: typeof MessageTypes.ADD_USER,
    payload: UserPayload
}

interface AddMessageAction {
    type: typeof MessageTypes.ADD_MESSAGE,
    payload: any
}

interface GetChatsAction {
    type: typeof MessageTypes.GET_CHATS,
    payload: MessageState
}

interface GetMessagesAction {
    type: typeof MessageTypes.GET_MESSAGES,
    payload: any
}

interface UpdateMessagesAction {
    type: typeof MessageTypes.UPDATE_MESSAGES,
    payload: any
}

interface DeleteMessagesAction {
    type: typeof MessageTypes.DELETE_MESSAGES,
    payload: any
}

interface DeleteChatAction {
    type: typeof MessageTypes.DELETE_CHAT,
    payload: MessageState
}

interface CheckOnlineStatusAction {
    type: typeof MessageTypes.ONLINE_STATUS,
    payload: UserPayload[]
}

interface CallAction {
    type: typeof MessageTypes.CALL,
    payload: any
}

interface PeerAction {
    type: typeof MessageTypes.PEER,
    payload: any
}

export type MessageActions = AddUserAction | AddMessageAction | GetChatsAction | GetMessagesAction | UpdateMessagesAction | DeleteMessagesAction | DeleteChatAction | CheckOnlineStatusAction | CallAction | PeerAction;