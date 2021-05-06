import React from 'react'
import { PostData, CommentData } from 'store/types/postTypes';
import CommentCard from './CommentCard';


interface CommentDisplayProps {
    post: PostData
    comment: CommentData
    replyCm: any[]
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ post, comment, replyCm }) => {
    return (
        <div className="comment_display">
            <CommentCard 
                comment={comment} 
                post={post} 
                commentId={comment._id} />
        </div>
    )
}

export default CommentDisplay
