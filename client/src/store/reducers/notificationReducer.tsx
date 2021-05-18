import { NotificationActions, NotificationState, notification_types, NotificationData } from "store/types/notificationTypes";
import { editData } from '../actions/globalActions';

const initialState: NotificationState = {
    loading: false,
    data: [],
    sound: false
}

const notificationReducer = (state = initialState, action: NotificationActions) => {
    switch (action.type) {
        case notification_types.GET_NOTIFICATIONS:
            return {
                ...state,
                data: action.payload
            };
        case notification_types.CREATE_NOTIFICATION:
            return {
                ...state,
                data: [action.payload, ...state.data]
            };
        case notification_types.REMOVE_NOTIFICATION:
            return {
                ...state,
                data: state.data.filter(item => (
                    item.id !== (action.payload as NotificationData).id || item.url !== (action.payload as NotificationData).url
                ))
            };
        case notification_types.UPDATE_NOTIFICATION:
            return {
                ...state,
                data: editData
                    (state.data, action.payload._id, action.payload)
            };
        case notification_types.UPDATE_SOUND:
            return {
                ...state,
                sound: action.payload
            };
        case notification_types.DELETE_ALL_NOTIFICATIONS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

export default notificationReducer;
