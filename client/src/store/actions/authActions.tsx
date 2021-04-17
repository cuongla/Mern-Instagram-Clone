import { Dispatch } from 'react';
import { postDataAPI } from 'functions/fetchData';
import { AuthAction, LoginData } from '../types/authTypes';

export const login = (data: LoginData) => async (dispatch: Dispatch<AuthAction>) => {
    try {
        //vloading
        dispatch({
            type: 'NOTIFY',
            payload: {
                loading: true
            }
        });

        // login user
        const res = await postDataAPI('login', data);
        localStorage.setItem('firstLogin', 'true');
        dispatch({
            type: 'AUTH',
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        });

        // notify user that they have logged in
        dispatch({
            type: 'NOTIFY',
            payload: {
                msg: res.data.msg
            }
        });
    } catch(err) {
        dispatch({
            type: 'NOTIFY',
            payload: {
                error: err.response.data.msg
            }
        });
    }
}