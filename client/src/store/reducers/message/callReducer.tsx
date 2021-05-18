import { MessageActions, message_types } from '../../types/messageTypes';

const callReducer = (state = null, action: MessageActions) => {
    switch (action.type){
        case message_types.CALL:
            return action.payload;
        default:
            return state;
    }
}


export default callReducer