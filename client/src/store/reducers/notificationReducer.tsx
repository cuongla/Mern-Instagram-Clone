import { NotificationActions, NotificationState, NotificationTypes, NotificationPayload } from "types/notificationTypes";
import { editData } from '../actions/globalActions';

const initialState: NotificationState = {
    loading: false,
    data: [],
    sound: false
}

const notificationReducer = (state = initialState, action: NotificationActions) => {
    switch (action.type) {
        case NotificationTypes.GET_NOTIFICATIONS:
            return {
                ...state,
                data: action.payload
            };
        case NotificationTypes.CREATE_NOTIFICATION:
            return {
                ...state,
                data: [action.payload, ...state.data]
            };
        case NotificationTypes.REMOVE_NOTIFICATION:
            return {
                ...state,
                data: state.data.filter(item => (
                    item.id !== action.payload!._id || item.url !== action.payload!.url
                ))
            };
        case NotificationTypes.UPDATE_NOTIFICATION:
            return {
                ...state,
                data: editData(state.data, (action.payload as NotificationPayload)._id, action.payload)
            };
        case NotificationTypes.UPDATE_SOUND:
            return {
                ...state,
                sound: action.payload
            };
        case NotificationTypes.DELETE_ALL_NOTIFICATIONS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

export default notificationReducer;
