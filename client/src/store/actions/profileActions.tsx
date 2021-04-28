import { Dispatch } from 'react';
import { AuthState } from 'store/types/authTypes';
import { Profile, ProfileActions, profile_types } from '../types/userTypes';
import { getDataAPI } from 'utils/fetchData';
import { ALERT } from '../types/alertTypes';
import { authTypes } from '../types/authTypes';
import { imageUpload } from 'utils/imageUpload';
import { patchhDataAPI } from 'utils/fetchData';
import { deleteData, editData } from 'store/actions/globalActions';

export const getProfileUsers = (users: Profile[], id: string, auth: AuthState) => async (dispatch: Dispatch<ProfileActions>) => {
    if (users.every(user => user._id !== id)) {
        try {
            dispatch({ type: profile_types.LOADING, payload: true });

            // get user from server
            const res = await getDataAPI(`/user/${id}`, auth.token);
            dispatch({
                type: profile_types.GET_USER,
                payload: res.data
            });

            // stop loading
            dispatch({ type: profile_types.LOADING, payload: false });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const updateProfileUser = (userData: any, avatar: any, auth: AuthState) => async (dispatch: Dispatch<ProfileActions>) => {
    if (!userData.fullname) return dispatch({
        type: ALERT,
        payload: { error: 'Please add your full name.' }
    });

    if (userData.fullname.length > 25) return dispatch({
        type: ALERT,
        payload: { error: 'Your full name is too long.' }
    });

    if (userData.story.length > 200) return dispatch({
        type: ALERT,
        payload: { error: 'Your story should be between 0 - 200 characters.' }
    });

    try {
        let media;
        dispatch({ type: ALERT, payload: ({ loading: true }) });

        // uploading image
        if (avatar) media = await imageUpload([avatar]);

        // edit form
        const res = await patchhDataAPI(
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

        dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const follow = (users: Profile[], user: Profile, auth: AuthState) => async (dispatch: Dispatch<ProfileActions>) => {
    let newUser = { ...user, followers: [...user.followers, auth.user] };
    if(users.every(item => item._id !== user._id)) {
        newUser = {
            ...user,
            followers: [...user.followers, auth.user]
        }
    } else {
        users.forEach(item => {
            if(item._id === user._id) {
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
        await patchhDataAPI(`user/${user._id}/follow`, null, auth.token);
    } catch(err) {
        dispatch({
            type: ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unfollow = (users: Profile[], user: Profile, auth: AuthState) => async (dispatch: Dispatch<ProfileActions>) => {
    let newUser;

    if(users.every(item => item._id !== user._id)) {
        newUser = {
            ...user,
            followers: deleteData(user.followers, (auth.user as Profile)._id)
        }
    } else {
        users.forEach(item => {
            if(item._id === user._id) {
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

        // update in db
        try {
            await patchhDataAPI(`user/${user._id}/unfollow`, null, auth.token);
        } catch(err) {
            dispatch({
                type: ALERT,
                payload: { error: err.response.data.msg }
            })
        }
}