import { Dispatch } from 'react';
import { AuthState } from 'store/types/authTypes';
import { Profile, ProfileActions, profile_types } from '../types/userTypes';
import { getDataAPI } from 'utils/fetchData';
import { ALERT } from '../types/alertTypes';


export const getProfileUsers = (users: Profile[], id: string, auth: AuthState) => async (dispatch: Dispatch<ProfileActions>) => {
    if(users.every(user => user._id !== id)) {
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
        } catch(err) {
            dispatch({
                type: ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}