import React, { useEffect, useState } from 'react'
import { PostData, CommentData } from 'store/types/postTypes';
import CommentCard from './CommentCard';


interface CommentDisplayProps {
    post: PostData
    comment: CommentData
    replyCm: any[]
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ post, comment, replyCm }) => {
    const [showRep, setShowRep] = useState<CommentData[]>([]);
    const [next, setNext] = useState(1);

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next));
    }, [replyCm, next]);

    return (
        <div className="comment_display">
            <CommentCard
                comment={comment}
                post={post}
                commentId={comment._id}>
                <div className="pl-4">
                    {
                        showRep.map((item, index) => (
                            item.reply && (
                                <CommentCard
                                    key={index}
                                    comment={item}
                                    post={post}
                                    commentId={comment._id} />
                            )
                        ))
                    }
                    {
                        replyCm.length - next > 0
                            ? (
                                <div
                                    style={{ cursor: 'pointer', color: 'crimson' }}
                                    onClick={() => setNext(next + 10)}>
                                    See more replies...
                                </div>
                            )
                            : replyCm.length > 1 && (
                                <div
                                    style={{ cursor: 'pointer', color: 'crimson' }}
                                    onClick={() => setNext(1)}>
                                    Hide replies...
                                </div>
                            )
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
