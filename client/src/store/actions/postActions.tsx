import { Dispatch } from 'react';
import { imageUpload } from 'utils/imageUpload';
import { getDataAPI, postDataAPI, deleteDataAPI, patchDataAPI } from 'utils/fetchData';
import { IAuthState, auth_constants } from 'types/authTypes';
import { PostAction, PostData, post_constants } from 'types/postTypes';
import { global_constants } from 'types/globalTypes';
import { createNotification, removeNotification } from './notificationActions';
import { Socket } from 'socket.io-client';
import { NotificationActions } from 'types/notificationTypes';

interface IMedia {
    public_id: string
    url: string
}

export const createPost = (content: string, images: any[], auth: IAuthState, socket: Socket) => async (dispatch: Dispatch<PostAction | NotificationActions>) => {
    let media: IMedia[] = [];

    try {
        dispatch({ type: global_constants.ALERT, payload: { loading: true } });

        if (images.length > 0) media = await imageUpload(images);

        //  create post
        const res = postDataAPI(
            'posts',
            {
                content,
                images: media
            },
            auth.token
        );

        dispatch({
            type: post_constants.CREATE_POST,
            payload: { ...(await res).data.newPost, user: auth.user }
        });

        // Notify
        const msg = {
            id: (await res).data.newPost._id,
            text: 'added a new post.',
            recipients: (await res).data.newPost.user.followers,
            url: `/post/${(await res).data.newPost._id}`,
            content,
            image: media[0].url
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

export const getPosts = (token: string) => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({ type: post_constants.LOADING_POST, payload: true });

        // get data
        const res = await getDataAPI('posts', token);
        dispatch({
            type: post_constants.GET_POSTS,
            payload: res.data
        })


        dispatch({ type: post_constants.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const updatePost = (content: string, images: any[], auth: IAuthState, status: any) => async (dispatch: Dispatch<PostAction>) => {
    let media: IMedia[] = [];
    const imgNewUrl = images.filter(img => !img.url);
    const imgOldUrl = images.filter(img => img.url);

    // if no new images up;oad
    // keep the old one
    if (status.content === content
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        dispatch({ type: global_constants.ALERT, payload: { loading: true } });

        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);
        const res = patchDataAPI(
            `post/${status._id}`,
            {
                content,
                images: [...imgOldUrl, ...media]
            },
            auth.token
        )

        dispatch({
            type: post_constants.UPDATE_POST,
            payload: (await res).data.newPost
        });

        dispatch({ type: global_constants.ALERT, payload: { success: (await res).data.msg } });
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const likePost = (post: PostData, auth: IAuthState, socket: Socket) => async (dispatch: Dispatch<PostAction | NotificationActions>) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    dispatch({
        type: post_constants.UPDATE_POST,
        payload: newPost
    });

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token);

        // notification
        const msg = {
            id: auth.user!._id,
            text: 'like your post.',
            recipients: [post.user._id],
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

export const unlikePost = (post: PostData, auth: IAuthState, socket: Socket) => async (dispatch: Dispatch<PostAction | NotificationActions>) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user!._id) };
    dispatch({
        type: post_constants.UPDATE_POST,
        payload: newPost
    });

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

        // notification
        const msg = {
            id: auth.user!._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
        };
        dispatch(removeNotification(msg, auth, socket) as NotificationActions);
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const getPostDetail = (detailPost: PostData[], id: string, auth: IAuthState) => async (dispatch: Dispatch<PostAction>) => {
    if (detailPost.every(post => post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`, auth.token);
            dispatch({ type: post_constants.GET_POST, payload: res.data.post });
        } catch (err) {
            dispatch({
                type: global_constants.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const deletePost = (post: PostData, auth: IAuthState, socket: Socket) => async (dispatch: Dispatch<PostAction | NotificationActions>) => {
    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token)

        // Notify
        const msg = {
            id: post._id as string,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        }

        dispatch(removeNotification(msg, auth, socket) as NotificationActions);
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const savePost = (post: PostData, auth: IAuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newUser = { ...auth.user, saved: [...auth.user!.savedPost, post._id] };

    dispatch({ type: authTypes.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataAPI(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unSavePost = (post: PostData, auth: IAuthState) => async (dispatch: Dispatch<PostAction>) => {
    // @ts-ignore
    const newUser = { ...auth.user, saved: auth.user!.savedPost.filter(id => id !== post._id) };

    dispatch({ type: authTypes.AUTH, payload: { ...auth, user: newUser } });

    try {
        await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}