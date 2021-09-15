import { MessageActions, message_constants } from 'typings/messageTypes';

const callReducer = (state = null, action: MessageActions) => {
    switch (action.type) {
        case message_constants.CALL:
            return action.payload;
        default:
            return state;
    }
}


export default callReducer