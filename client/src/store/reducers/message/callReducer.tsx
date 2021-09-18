import { MessageActions, MessageTypes } from 'types/messageTypes';

const callReducer = (state = null, action: MessageActions) => {
    switch (action.type) {
        case MessageTypes.CALL:
            return action.payload;
        default:
            return state;
    }
}


export default callReducer;