import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { PostData } from 'store/types/postTypes';
import PostCard from './PostCard';


const Posts = () => {
    const { homePosts } = useSelector((state: RootState) => state);

    return (
        <div className="posts">
            {
                homePosts.posts.map((post: PostData) => (
                    <PostCard key={post._id} post={post} />
                ))
            }
        </div>
    )
}

export default Posts
