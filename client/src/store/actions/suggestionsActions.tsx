import { Dispatch } from 'react';
import { ProfileActions, profile_types } from '../types/userTypes';
import { global_types } from '../types/globalTypes';
import { getDataAPI } from 'utils/fetchData';

export const getSuggestions = (token: string) => async (dispatch: Dispatch<ProfileActions>) => {
    try {
        dispatch({ type: profile_types.LOADING, payload: true })
        
        const res = await getDataAPI('suggestionsUser', token)
        dispatch({ type: profile_types.GET_SUGGESSTION_USERS, payload: res.data })

        dispatch({ type: profile_types.LOADING, payload: false })
        
    } catch (err) {
        dispatch({type: global_types.ALERT, payload: {error: err.response.data.msg}})
    }
}