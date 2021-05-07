import { editData } from 'store/actions/globalActions';
import { PostAction, PostData, post_types } from 'store/types/postTypes';

const detailPostReducer = (state: PostData[] = [], action: PostAction) => {
    switch (action.type) {
        case post_types.GET_POST:
            return [...state, action.payload]
        case post_types.UPDATE_POST:
            return editData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}

export default detailPostReducer;