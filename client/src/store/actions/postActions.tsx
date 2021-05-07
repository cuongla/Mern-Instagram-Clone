import { Dispatch } from 'react';
import { imageUpload } from 'utils/imageUpload';
import { getDataAPI, patchhDataAPI, postDataAPI } from 'utils/fetchData';
import { AuthState } from 'store/types/authTypes';
import { PostAction, PostData, post_types } from 'store/types/postTypes';
import { global_types } from 'store/types/globalTypes';

interface IMedia {
    public_id: string
    url: string
}

export const createPost = (content: string, images: any[], auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    let media: IMedia[] = [];

    try {
        dispatch({ type: global_types.ALERT, payload: { loading: true } });

        if (images.length > 0) media = await imageUpload(images);
        const res = postDataAPI(
            'posts',
            {
                content,
                images: media
            },
            auth.token
        );

        dispatch({
            type: post_types.CREATE_POST,
            payload: { ...(await res).data.newPost, user: auth.user }
        });

        dispatch({ type: global_types.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const getPosts = (token: string) => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({ type: post_types.LOADING_POST, payload: true });

        // get data
        const res = await getDataAPI('posts', token);
        dispatch({
            type: post_types.GET_POSTS,
            payload: res.data
        })


        dispatch({ type: post_types.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const updatePost = (content: string, images: any[], auth: AuthState, status: any) => async (dispatch: Dispatch<PostAction>) => {
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
        dispatch({ type: global_types.ALERT, payload: { loading: true } });

        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);
        const res = patchhDataAPI(
            `post/${status._id}`,
            {
                content,
                images: [...imgOldUrl, ...media]
            },
            auth.token
        )

        dispatch({
            type: post_types.UPDATE_POST,
            payload: (await res).data.newPost
        });

        dispatch({ type: global_types.ALERT, payload: { success: (await res).data.msg } });
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const likePost = (post: PostData, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    dispatch({
        type: post_types.UPDATE_POST,
        payload: newPost
    });

    try {
        await patchhDataAPI(`post/${post._id}/like`, null, auth.token);
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const unlikePost = (post: PostData, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user!._id)};
    dispatch({
        type: post_types.UPDATE_POST,
        payload: newPost
    });

    try {
        await patchhDataAPI(`post/${post._id}/unlike`, null, auth.token);
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const getPostDetail = (detailPost: PostData[], id: string, auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    if(detailPost.every(post => post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`, auth.token);
            dispatch({ type: post_types.GET_POST, payload: res.data.post });
        }catch(err) {
            dispatch({
                type: global_types.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}
