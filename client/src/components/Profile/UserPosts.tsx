import React, { useEffect, useState } from 'react'
import { PostData } from 'store/types/postTypes';
import { UserInfoProps } from './UserInfo';
import UserPostThumb from './UserPostThumb';


const UserPosts: React.FC<UserInfoProps> = ({ auth, id, dispatch, profile }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(profile.posts);
    }, [id, posts, profile.posts]);
    return (
        <div>
            <UserPostThumb posts={posts} />
        </div>
    )
}

export default UserPosts
