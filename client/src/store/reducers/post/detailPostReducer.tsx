import { editData } from 'store/actions/globalActions';
import { PostAction, PostPayload, PostTypes } from 'types/postTypes';

const detailPostReducer = (state: PostPayload[] = [], action: PostAction) => {
    switch (action.type) {
        case PostTypes.GET_POST:
            return [...state, action.payload]
        case PostTypes.UPDATE_POST:
            return editData(state, action.payload._id as string, action.payload)
        default:
            return state;
    }
}

export default detailPostReducer;