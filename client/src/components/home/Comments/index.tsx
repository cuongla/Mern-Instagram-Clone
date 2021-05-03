import React from 'react'
import { PostData } from 'store/types/postTypes'
import CommentDisplay from './CommentDisplay'

interface CommentsProps {
    post: PostData
}

const Comments: React.FC<CommentsProps> = ({ post }) => {
    return (
        <div className="comments">
            {
                post.comments.map(comment => (
                    <CommentDisplay 
                        key={comment._id}
                        comment={comment}
                        post={post} />
                ))
            }
        </div>
    )
}

export default Comments
