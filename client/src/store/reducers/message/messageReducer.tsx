import { MessageActions, MessageState, message_constants } from "typings/messageTypes";
import { editData, deleteData } from '../../actions/globalActions';

const initialState: MessageState = {
    users: [],
    resultUsers: 0,
    data: [],
    firstLoad: false
}

const messageReducer = (state = initialState, action: MessageActions) => {
    switch (action.type) {
        case message_constants.ADD_USER:
            if (state.users.every(item => item._id !== action.payload._id)) {
                return {
                    ...state,
                    users: [action.payload, ...state.users]
                };
            }
            return state;
        case message_constants.ADD_MESSAGE:
            return {
                ...state,
                data: state.data.map((item: any) =>
                    item._id === action.payload.recipient || item._id === action.payload.sender
                        ? {
                            ...item,
                            messages: [...item.messages, action.payload],
                            result: item.result + 1
                        }
                        : item
                ),
                users: state.users.map(user =>
                    user._id === action.payload.recipient || user._id === action.payload.sender
                        ? {
                            ...user,
                            text: action.payload.text,
                            media: action.payload.media,
                            call: action.payload.call
                        }
                        : user
                )
            };
        case message_constants.GET_CHATS:
            return {
                ...state,
                users: action.payload.newArr,
                resultUsers: action.payload.result,
                firstLoad: true
            };
        case message_constants.GET_MESSAGES:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case message_constants.UPDATE_MESSAGES:
            return {
                ...state,
                data: editData(state.data, action.payload._id, action.payload)
            };
        case message_constants.DELETE_MESSAGES:
            return {
                ...state,
                data: state.data.map((item: any) =>
                    item._id === action.payload._id
                        ? { ...item, messages: action.payload.newData }
                        : item
                )
            };
        case message_constants.DELETE_CHAT:
            return {
                ...state,
                users: deleteData(state.users, action.payload),
                data: deleteData(state.data, action.payload)
            };
        case message_constants.ONLINE_STATUS:
            return {
                ...state,
                users: state.users.map(user =>
                    action.payload.includes(user._id)
                        ? { ...user, online: true }
                        : { ...user, online: false }
                )
            };
        default:
            return state;
    }
}

export default messageReducer;