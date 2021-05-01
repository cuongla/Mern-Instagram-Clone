import React from 'react'
import { PostData } from 'store/types/postTypes'

export interface PostCardProps {
    post: PostData
}

const CardBody: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div>
            
        </div>
    )
}

export default CardBody;
