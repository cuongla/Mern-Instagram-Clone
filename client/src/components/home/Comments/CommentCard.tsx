import React, { ReactNode, useEffect, useState } from 'react'
import { PostData, CommentData } from 'store/types/postTypes';
import { Link } from 'react-router-dom';
import Avatar from 'components/reusable/Avatar';
import moment from 'moment';
import LikeButton from '../PostCard/LikeButton';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import CommentMenu from './CommentMenu';


interface CommentCardProps {
    children?: ReactNode
    post: PostData
    comment: CommentData
}

const CommentCard: React.FC<CommentCardProps> = ({ children, comment, post }) => {
    const { auth } = useSelector((state: RootState) => state);
    const [content, setContent] = useState('');
    const [readMore, setReadMore] = useState(false);
    const [isLike, setIsLike] = useState(false);


    useEffect(() => {
        setContent(comment.content);
    }, [comment]);

    const handleLike = () => { }

    const handleUnlike = () => {

    }

    return (
        <div
            className="comment_card mt-2"
            style={{
                opacity: comment._id ? 1 : 0.5,
                pointerEvents: comment._id ? 'inherit' : 'none'
            }}>
            <Link
                to={`/profile/${comment.user._id}`}
                className="d-flex text-dark">
                <Avatar
                    src={comment.user.avatar}
                    size="small-avatar" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>
            <div
                className="comment_content"
                style={{ cursor: 'pointer' }}>
                <div className="flex-fill">
                    <div>
                        <span>
                            {
                                content.length < 100
                                    ? content
                                    : readMore
                                        ? ' '
                                        : content.slice(0, 100) + '....'
                            }
                        </span>
                        {
                            content.length > 100 && (
                                <span
                                    className="readMore"
                                    onClick={() => setReadMore(!readMore)}>
                                    { readMore ? 'Hide content' : 'Read more'}
                                </span>
                            )
                        }
                    </div>
                    <div style={{ cursor: 'pointer' }}>
                        <small className="text-muted" style={{ marginRight: '10px' }}>
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="comment_content-icon">
                            {comment.likes.length} likes
                        </small>
                        <small className="comment_content-icon">
                            reply
                        </small>
                    </div>
                </div>
                <div
                    className="d-flex align-items-center mx-2"
                    style={{ cursor: 'pointer' }}>
                    <LikeButton
                        isLike={isLike}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike} />
                    <CommentMenu
                        post={post}
                        comment={comment}
                        auth={auth} />
                </div>
            </div>
        </div>
    )
}

export default CommentCard
