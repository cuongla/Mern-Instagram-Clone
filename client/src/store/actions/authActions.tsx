import { Dispatch } from 'react';
import { postDataAPI } from 'utils/fetchData';
import { AuthAction, LoginData, RegisterData } from 'types/authTypes';
import { formValidate } from 'utils/formValidate';
import { global_constants } from 'types/globalTypes';

export const register = (data: RegisterData) => async (dispatch: Dispatch<AuthAction>) => {
    const validData = formValidate(data);

    if (validData.errLength > 0) {
        return dispatch({
            type: global_constants.ALERT,
            payload: {
                errMsg: validData.errMsg
            }
        });
    };

    try {
        dispatch({ type: global_constants.ALERT, payload: { loading: true } });

        // regiter user
        const res = await postDataAPI('register', data);
        console.log(res.data);
        dispatch({
            type: 'AUTH',
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        });
        localStorage.setItem('auth', 'true');

        dispatch({
            type: global_constants.ALERT,
            payload: {
                msg: res.data.msg
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data
            }
        });
    }
}

export const login = (data: LoginData) => async (dispatch: Dispatch<AuthAction>) => {
    try {
        dispatch({ type: global_constants.ALERT, payload: { loading: true } });

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

        dispatch({
            type: global_constants.ALERT,
            payload: {
                msg: res.data.msg
            }
        });
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: err.response.data.msg
            }
        });
    }
}

export const logout = () => async (dispatch: Dispatch<AuthAction>) => {
    try {
        localStorage.removeItem('auth');
        await postDataAPI('logout');
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
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
            type: global_constants.ALERT,
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
                type: global_constants.ALERT,
                payload: {}
            });
        } catch (err) {
            dispatch({
                type: global_constants.ALERT,
                payload: {
                    error: err.response
                }
            });
        }
    }
}

