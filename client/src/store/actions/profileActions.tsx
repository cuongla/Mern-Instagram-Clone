import { Dispatch } from 'react';
import { AuthState } from 'store/types/authTypes';
import { Profile, ProfileActions, profile_types } from '../types/userTypes';
import { getDataAPI } from 'utils/fetchData';
import { global_types } from '../types/globalTypes';
import { authTypes } from '../types/authTypes';
import { imageUpload } from 'utils/imageUpload';
import { patchDataAPI } from 'utils/fetchData';
import { deleteData } from 'store/actions/globalActions';
import { Socket } from 'socket.io-client';
import { createNotification, removeNotification } from './notificationActions';
import { NotificationActions } from 'store/types/notificationTypes';

export const getProfile = (id: string, auth: AuthState) => async (dispatch: Dispatch<ProfileActions>) => {
    dispatch({ type: profile_types.GET_IDS, payload: id });

    try {
        dispatch({ type: profile_types.LOADING, payload: true });

        // get user from server
        const profileData = await getDataAPI(`/user/${id}`, auth.token);
        dispatch({
            type: profile_types.GET_PROFILE,
            payload: profileData.data
        });

        // get user posts
        const postData = await getDataAPI(`/user_posts/${id}`, auth.token);
        dispatch({
            type: profile_types.GET_USER_POSTS,
            payload: postData.data
        });

        // stop loading
        dispatch({ type: profile_types.LOADING, payload: false });
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const updateProfileUser = (userData: any, avatar: any, auth: AuthState) => async (dispatch: Dispatch<ProfileActions>) => {
    if (!userData.fullname) return dispatch({
        type: global_types.ALERT,
        payload: { error: 'Please add your full name.' }
    });

    if (userData.fullname.length > 25) return dispatch({
        type: global_types.ALERT,
        payload: { error: 'Your full name is too long.' }
    });

    if (userData.story.length > 200) return dispatch({
        type: global_types.ALERT,
        payload: { error: 'Your story should be between 0 - 200 characters.' }
    });

    try {
        let media;
        dispatch({ type: global_types.ALERT, payload: ({ loading: true }) });

        // uploading image
        if (avatar) media = await imageUpload([avatar]);

        // edit form
        const res = await patchDataAPI(
            `user/${auth.user?._id}`,
            {
                ...userData,
                avatar: avatar ? (media as any)[0].url : auth.user?.avatar
            }
            , auth.token);

        dispatch({
            type: authTypes.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...userData,
                    avatar: avatar ? (media as any)[0].url : auth.user?.avatar,
                }
            }
        })

        dispatch({ type: global_types.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const follow = (users: Profile[], user: Profile, auth: AuthState, socket: Socket) => async (dispatch: Dispatch<ProfileActions | NotificationActions>) => {
    let newUser = { ...user, followers: [...user.followers, auth.user] };
    if (users.every(item => item._id !== user._id)) {
        newUser = {
            ...user,
            followers: [...user.followers, auth.user]
        }
    } else {
        users.forEach(item => {
            if (item._id === user._id) {
                newUser = {
                    ...item,
                    followers: [...item.followers, auth.user]
                }
            }
        })
    }

    // follow user
    dispatch({
        type: profile_types.FOLLOW,
        payload: newUser
    });

    dispatch({
        type: authTypes.AUTH,
        payload: {
            ...auth,
            user: {
                ...auth.user,
                following: [...auth.user!.following, newUser]
            }
        }
    });

    // update in db
    try {
        const res = await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
        socket.emit('follow', res.data.newUser);

        // Notify
        const msg = {
            id: auth.user!._id,
            text: 'has started to follow you.',
            recipients: [newUser._id],
            url: `/profile/${auth.user!._id}`,
        }

        dispatch(createNotification(msg, auth, socket) as NotificationActions)
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unfollow = (users: Profile[], user: Profile, auth: AuthState, socket: Socket) => async (dispatch: Dispatch<ProfileActions | NotificationActions>) => {
    let newUser;

    if (users.every(item => item._id !== user._id)) {
        newUser = {
            ...user,
            followers: deleteData(user.followers, (auth.user as Profile)._id)
        }
    } else {
        users.forEach(item => {
            if (item._id === user._id) {
                newUser = {
                    ...item,
                    followers: deleteData(item.followers, (auth.user as Profile)._id)
                }
            }
        })
    }

    // unfollow user
    dispatch({
        type: profile_types.UNFOLLOW,
        payload: newUser
    });

    dispatch({
        type: authTypes.AUTH,
        payload: {
            ...auth,
            user: {
                ...auth.user,
                following: deleteData((auth.user as Profile).following, (newUser as Profile)._id)
            }
        }
    });

    try {
        const res = await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);
        socket.emit('unFollow', res.data.newUser)

        // notification
        const msg = {
            id: auth.user!._id,
            text: 'has started to follow you.',
            recipients: [(newUser as Profile)._id],
            url: `/profile/${auth.user!._id}`,
        }

        dispatch(removeNotification(msg, auth, socket) as NotificationActions)
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}