import { Socket } from 'socket.io-client';
import { Dispatch } from 'react';
import { IAuthState } from "types/authTypes";
import { global_constants } from 'types/globalTypes';
import { CommentData, PostAction, IPostData, post_constants } from "types/postTypes";
import { deleteDataAPI, patchDataAPI, postDataAPI } from 'utils/fetchData';
import { deleteData, editData } from './globalActions';
import { createNotification, removeNotification } from './notificationActions';
import { NotificationActions } from 'types/notificationTypes';

export const createComment = (post: IPostData, newComment: any, auth: IAuthState, socket: Socket) => async (dispatch: Dispatch<PostAction | NotificationActions>) => {
    const newPost = {
        ...post,
        comments: [...post.comments, newComment]
    };

    dispatch({
        type: post_constants.UPDATE_POST,
        payload: newPost
    });

    try {
        const data = {
            ...newComment,
            postId: post._id,
            postUserId: post.user._id
        };
        const res = await postDataAPI('comment', data, auth.token);

        const newData = { ...res.data.newComment, user: auth.user };
        const updatedPost = { ...post, comments: [...post.comments, newData] };
        dispatch({ type: post_constants.UPDATE_POST, payload: updatedPost });

        // Socket
        socket.emit('createComment', newPost);

        // Notify
        const msg = {
            id: res.data.newComment._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url
        }

        dispatch(createNotification(msg, auth, socket) as NotificationActions);
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const updateComment = (comment: CommentData, post: IPostData, content: string, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newComments = editData(post.comments, comment._id, { ...comment, content });
    const newPost = { ...post, comments: newComments };

    dispatch({ type: post_constants.UPDATE_POST, payload: newPost });

    try {
        await patchDataAPI(
            `comment/${comment._id}`,
            { content },
            auth.token
        );
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const likeComment = (comment: CommentData, post: IPostData, auth: IAuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = editData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments }

    dispatch({ type: post_constants.UPDATE_POST, payload: newPost });

    try {
        await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const unlikeComment = (comment: CommentData, post: IPostData, auth: IAuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newComment = { ...comment, likes: deleteData(comment.likes, auth.user!._id) };
    const newComments = editData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments }

    dispatch({ type: post_constants.UPDATE_POST, payload: newPost });

    try {
        await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const deleteComment = (post: IPostData, comment: CommentData, auth: IAuthState, socket: Socket) => async (dispatch: Dispatch<PostAction | NotificationActions>) => {
    // @ts-ignore
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment];

    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    };

    dispatch({
        type: post_constants.UPDATE_POST,
        payload: newPost
    });

    try {
        deleteArr.forEach(item => {
            deleteDataAPI(`comment/${item._id}`, auth.token);

            // notification
            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [post.user._id],
                url: `/post/${post._id}`,
            }

            dispatch(removeNotification(msg, auth, socket) as NotificationActions);
        });
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}