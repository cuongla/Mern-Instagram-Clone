import { Dispatch } from 'react';
import { DiscoverActions, discover_constants } from 'types/discoverTypes';
import { global_constants } from 'types/globalTypes';
import { getDataAPI } from 'utils/fetchData';


export const getDiscoverPosts = (token: string) => async (dispatch: Dispatch<DiscoverActions>) => {
    try {
        dispatch({ type: discover_constants.LOADING_DISCOVER, payload: true });

        // get discover posts
        const res = await getDataAPI(`posts/discover`, token);
        dispatch({
            type: discover_constants.GET_DISCOVER_POSTS,
            payload: res.data
        });

        dispatch({ type: discover_constants.LOADING_DISCOVER, payload: false });
    } catch (err) {
        dispatch({
            type: global_constants.ALERT,
            payload: {
                error: ''
            }
        })
    }
}