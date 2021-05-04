import React, { useEffect, useState } from 'react'
import { CommentData, PostData } from 'store/types/postTypes'
import CommentDisplay from './CommentDisplay'

interface CommentsProps {
    post: PostData
}

const Comments: React.FC<CommentsProps> = ({ post }) => {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [showComments, setShowComments] = useState<CommentData[]>([]);
    const [next, setNext] = useState(2);

    useEffect(() => {
        const filteredComments = post.comments.filter(comment => !comment.reply);
        setComments(filteredComments);
        setShowComments(filteredComments.slice(filteredComments.length - next));
    }, [next, post.comments]);

    return (
        <div className="comments">
            {
                showComments.map(comment => (
                    <CommentDisplay
                        key={comment._id}
                        comment={comment}
                        post={post} />
                ))
            }
            {
                comments.length - next > 0
                    ? (
                        <div
                            className="p-2 border-top"
                            style={{ cursor: 'pointer', color: 'crimson' }}
                            onClick={() => setNext(next + 10)}>
                            See more comment...
                        </div>
                    )
                    : comments.length > 2 && (
                        <div
                            className="p-2 border-top"
                            style={{ cursor: 'pointer', color: 'crimson' }}
                            onClick={() => setNext(2)}>
                            Hide comment...
                        </div>
                    )
            }
        </div>
    )
}

export default Comments
