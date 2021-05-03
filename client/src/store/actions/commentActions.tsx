import { Dispatch } from 'react';
import { AuthState } from "store/types/authTypes";
import { global_types } from 'store/types/globalTypes';
import { PostAction, PostData, post_types } from "store/types/postTypes";
import { postDataAPI } from 'utils/fetchData';


export const createComment = (post: PostData, newComment: any, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newPost = {
        ...post, 
        comments: [...post.comments, newComment]
    };

    dispatch({
        type: post_types.UPDATE_POST,
        payload: newPost
    });

    try {
        const data = {...newComment, postId: post._id};
        const res = await postDataAPI('comment', data, auth.token);
        
        const newData = {...res.data.newComment, user: auth.user};
        const updatedPost = {...post, comments: [...post.comments, newData]};
        dispatch({ type: post_types.UPDATE_POST, payload: updatedPost});

    } catch(err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}