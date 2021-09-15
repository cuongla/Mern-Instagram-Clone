import { editData } from 'store/actions/globalActions';
import { PostAction, IPostData, post_constants } from 'typings/postTypes';

const detailPostReducer = (state: IPostData[] = [], action: PostAction) => {
    switch (action.type) {
        case post_constants.GET_POST:
            return [...state, action.payload]
        case post_constants.UPDATE_POST:
            return editData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}

export default detailPostReducer;