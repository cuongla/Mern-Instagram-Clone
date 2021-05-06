import React from 'react';
import { PostData } from 'store/types/postTypes';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Comments from '../Comments';
import InputComments from '../Comments/InputComment';

interface PostCardProps {
    post: PostData
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="card my-3">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />
            <Comments post={post} />
            <InputComments post={post} />
        </div>
    )
}

export default PostCard;
