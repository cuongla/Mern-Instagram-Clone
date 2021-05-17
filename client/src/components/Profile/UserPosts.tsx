import React, { useEffect, useState } from 'react'
import { UserInfoProps } from './UserInfo';
import UserPostThumb from './UserPostThumb';
import LoadMoreBtn from 'components/reusable/buttons/LoadMoreBtn';
import LoadIcon from 'images/loading.gif';
import { getDataAPI } from 'utils/fetchData';
import { profile_types } from 'store/types/userTypes';


const UserPosts: React.FC<UserInfoProps> = ({ auth, id, dispatch, profile }) => {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        profile.posts.forEach((data: any) => {
            console.log(data);
            if(data.user === id) {
                setPosts(posts);
                setResult(data.result)
                setPage(data.page)
            }
        })
    }, [id, posts, profile.posts]);

    const handleLoadMore = async () => {
        setLoading(true);
        const res = await getDataAPI(`user_posts/${id}?limit=${page * 3}`, auth.token);
        dispatch({
            type: profile_types.GET_USER_POSTS,
            payload: res.data
        });
        setLoading(false);
    }

    return (
        <div>
            <div>
                <UserPostThumb 
                    posts={posts} 
                    result={result} />
                {
                    loading && <img 
                        src={LoadIcon} 
                        alt="loading" 
                        className="d-block mx-auto" />
                }
                <LoadMoreBtn
                    result={result}
                    page={page}
                    loading={loading}
                    handleLoadMore={handleLoadMore} />
            </div>
        </div>
    )
}

export default UserPosts
