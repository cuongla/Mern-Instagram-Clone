import React from 'react'
import { PostData, CommentData } from 'store/types/postTypes';
import CommentCard from './CommentCard';


interface CommentDisplayProps {
    post: PostData
    comment: CommentData
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ post, comment }) => {
    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} />
        </div>
    )
}

export default CommentDisplay
