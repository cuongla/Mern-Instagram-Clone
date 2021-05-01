import { Dispatch } from 'react';
import { imageUpload } from 'utils/imageUpload';
import { getDataAPI, postDataAPI } from 'utils/fetchData';
import { AuthState } from 'store/types/authTypes';
import { PostAction, post_types } from 'store/types/postTypes';
import { ALERT } from 'store/types/alertTypes';

interface IMedia {
    public_id: string
    url: string
}

export const createPost = (content: string, images: any[], auth: AuthState) => async (dispatch: Dispatch<PostAction>) => {
    let media: IMedia[] = [];

    try {
        dispatch({ type: ALERT, payload: { loading: true } });

        if (images.length > 0) media = await imageUpload(images);
        const res = postDataAPI(
            'posts',
            {
                content,
                images: media
            },
            auth.token
        )
        dispatch({
            type: post_types.CREATE_POST,
            payload: (await res).data.newPost
        });

        dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const getPosts = (token: string) => async (dispatch: Dispatch<PostAction>) => {
    try {
        dispatch({ type: post_types.LOADING_POST, payload: true});

        // get data
        const res = await getDataAPI('posts', token);
        console.log(res.data);
        dispatch({
            type: post_types.GET_POSTS,
            payload: res.data
        })


        dispatch({ type: post_types.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}