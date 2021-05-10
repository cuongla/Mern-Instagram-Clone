import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { getDiscoverPosts } from 'store/actions/discoverActions';
import LoadIcon from 'images/loading.gif';
import UserPostThumb from 'components/profile/UserPostThumb';
import LoadMoreBtn from 'components/reusable/buttons/LoadMoreBtn';
import { getDataAPI } from 'utils/fetchData';
import { discover_types } from 'store/types/discoverTypes';
import { DiscoverState } from 'store/types/discoverTypes';


const Discover = () => {
    const dispatch = useDispatch();
    const { auth, discover } = useSelector((state: RootState) => state);
    const discoverData = discover as DiscoverState;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(discoverData.firstLoad) {
            dispatch(getDiscoverPosts(auth.token));
        }
    },[auth.token, discoverData.firstLoad, dispatch]);

    const handleLoadMore = async () => {
        setLoading(true);
        const res = await getDataAPI(`posts/discover?limit=${discoverData.page * 9}`, auth.token);
        dispatch({
            type: discover_types.UPDATE_DISCOVER_POSTS,
            payload: res.data
        })
        setLoading(false);
    }

    return (
        <div>
            {
                discoverData.loading 
                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                    : <UserPostThumb posts={discoverData.posts} result={discoverData.result} />
            }
            {
                loading && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }
            <LoadMoreBtn 
                result={discoverData.result}
                page={discoverData.page}
                loading={loading}
                handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Discover
