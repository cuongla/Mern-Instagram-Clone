import { message_types, MessageActions } from '../../types/messageTypes';

const peerReducer = (state = null, action: MessageActions) => {
    switch (action.type){
        case message_types.PEER:
            return action.payload;
        default:
            return state;
    }
}


export default peerReducer;