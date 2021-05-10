import React, { useEffect, useState } from 'react'
import { UserInfoProps } from './UserInfo';
import UserPostThumb from './UserPostThumb';
import LoadMoreBtn from 'components/reusable/buttons/LoadMoreBtn';
import LoadIcon from 'images/loading.gif';


const UserPosts: React.FC<UserInfoProps> = ({ auth, id, dispatch, profile }) => {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        profile.posts.forEach((data: any) => {
            if(data._id === id) {
                setPosts(data.posts);
                setResult(data.result)
            }
        })
    }, [id, posts, profile.posts]);

    const handleLoadMore = async () => {
        setLoading(true);

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
