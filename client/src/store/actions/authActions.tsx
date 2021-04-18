import { Dispatch } from 'react';
import { postDataAPI } from 'functions/fetchData';
import { AuthAction, LoginData } from '../types/authTypes';
import { ALERT } from '../types/alertTypes';

export const login = (data: LoginData) => async (dispatch: Dispatch<AuthAction>) => {
    try {
        //vloading
        dispatch({
            type: ALERT,
            payload: {
                loading: true
            }
        });

        // login user
        const res = await postDataAPI('login', data);
        localStorage.setItem('auth', 'true');
        dispatch({
            type: 'AUTH',
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        });

        // alert user that they have logged in
        dispatch({
            type: ALERT,
            payload: {
                msg: res.data.msg
            }
        });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
}

export const refreshToken = () => async (dispatch: Dispatch<AuthAction>) => {
    const localData = localStorage.getItem("auth");

    if (localData) {
        dispatch({
            type: ALERT,
            payload: {
                loading: true
            }
        });

        try {
            const res = await postDataAPI('refresh_token');

            dispatch({
                type: 'AUTH',
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            });

            dispatch({
                type: ALERT,
                payload: { }
            });
        } catch (err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: err.response.data.msg
                }
            });
        }
    }
}