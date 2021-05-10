import { Dispatch } from 'react';
import { DiscoverActions, discover_types } from 'store/types/discoverTypes';
import { global_types } from 'store/types/globalTypes';
import { getDataAPI } from 'utils/fetchData';


export const getDiscoverPosts = (token: string) => async (dispatch: Dispatch<DiscoverActions>) => {
    try {
        dispatch({ type: discover_types.LOADING_DISCOVER, payload: true });

        // get discover posts
        const res = await getDataAPI(`posts/discover`, token);
        console.log(res);
        dispatch({
            type: discover_types.GET_DISCOVER_POSTS,
            payload: res.data
        });

        dispatch({ type: discover_types.LOADING_DISCOVER, payload: false });
    } catch (err) {
        dispatch({
            type: global_types.ALERT,
            payload: {
                error: ''
            }
        })
    }
}