import { message_constants, MessageActions } from 'typings/messageTypes';

const peerReducer = (state = null, action: MessageActions) => {
    switch (action.type) {
        case message_constants.PEER:
            return action.payload;
        default:
            return state;
    }
}


export default peerReducer;