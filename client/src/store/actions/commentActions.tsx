import { Dispatch } from 'react';
import { AuthState } from "store/types/authTypes";
import { global_types } from 'store/types/globalTypes';
import { CommentData, PostAction, PostData, post_types } from "store/types/postTypes";
import { patchhDataAPI, postDataAPI } from 'utils/fetchData';
import { deleteData, editData } from './globalActions';


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
        const data = { ...newComment, postId: post._id };
        const res = await postDataAPI('comment', data, auth.token);

        const newData = { ...res.data.newComment, user: auth.user };
        const updatedPost = { ...post, comments: [...post.comments, newData] };
        dispatch({ type: post_types.UPDATE_POST, payload: updatedPost });

    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const updateComment = (comment: CommentData, post: PostData, content: string, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newComments = editData(post.comments, comment._id, { ...comment, content });
    const newPost = { ...post, comments: newComments };

    dispatch({ type: post_types.UPDATE_POST, payload: newPost });

    try {
        await patchhDataAPI(
            `comment/${comment._id}`,
            { content },
            auth.token
        );
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const likeComment = (comment: CommentData, post: PostData, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = editData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments }

    dispatch({ type: post_types.UPDATE_POST, payload: newPost });

    try {   
        await patchhDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const unlikeComment = (comment: CommentData, post: PostData, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newComment = { ...comment, likes: deleteData(comment.likes, auth.user!._id) };
    const newComments = editData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments }

    dispatch({ type: post_types.UPDATE_POST, payload: newPost });

    try {
        await patchhDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}