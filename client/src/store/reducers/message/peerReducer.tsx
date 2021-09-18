import { MessageTypes, MessageActions } from 'types/messageTypes';

const peerReducer = (state = null, action: MessageActions) => {
    switch (action.type) {
        case MessageTypes.PEER:
            return action.payload;
        default:
            return state;
    }
}


export default peerReducer;