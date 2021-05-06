import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { PostData, CommentData } from 'store/types/postTypes';
import { Link } from 'react-router-dom';
import Avatar from 'components/reusable/Avatar';
import moment from 'moment';
import LikeButton from '../PostCard/LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import CommentMenu from './CommentMenu';
import { updateComment, likeComment, unlikeComment } from 'store/actions/commentActions';
import InputComment from './InputComment';


interface CommentCardProps {
    children?: ReactNode
    post: PostData
    comment: CommentData
    commentId: string
}

const CommentCard: React.FC<CommentCardProps> = ({ children, comment, post, commentId }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);
    const [content, setContent] = useState('');
    const [readMore, setReadMore] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [onReply, setOnReply] = useState<boolean>(false);

    useEffect(() => {
        setContent(comment.content);
        if(comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true);
        }
    }, [auth.user._id, comment]);

    const handleUpdate = () => {
        if(comment.content !== content) {
            dispatch(updateComment(comment, post, content, auth));
            setOnEdit(false);
        } else {
            setOnEdit(false);
        }
    }

    const handleLike = async () => {
        if(loadLike) return;

        setIsLike(true);
        setLoadLike(true);

        await dispatch(likeComment(comment, post, auth));
        setLoadLike(false);
    }

    const handleUnlike = async () => {
        if(loadLike) return;

        setIsLike(false);
        setLoadLike(true);

        await dispatch(unlikeComment(comment, post, auth));
        setLoadLike(false);
    }

    const handleReply = () => {
        if(onReply) return setOnReply(false);
        setOnReply(true);
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
                    {
                        onEdit
                            ? <textarea
                                rows={5}
                                value={content}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
                            : (
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
                            )
                    }
                    <div style={{ cursor: 'pointer' }}>
                        <small className="text-muted" style={{ marginRight: '10px' }}>
                            {moment(comment.createdAt).fromNow()}
                        </small>
                        <small className="comment_content-icon">
                            {comment.likes.length} likes
                        </small>

                        {
                            onEdit
                                ? (
                                    <>
                                        <small 
                                            className="comment_content-icon"
                                            onClick={handleUpdate}>
                                            update
                                        </small>
                                        <small  
                                            className="comment_content-icon"
                                            onClick={() => setOnEdit(false)}>
                                            cancel
                                        </small>
                                    </>
                                )
                                : (
                                    <small 
                                        className="comment_content-icon"
                                        onClick={handleReply}
                                        >
                                        {onReply ? 'cancel' : 'reply' }
                                    </small>
                                )
                        }
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
                        auth={auth}
                        setOnEdit={setOnEdit} />
                </div>
            </div>
            {
                onReply && (
                    <InputComment 
                        post={post} 
                        onReply={onReply} 
                        setOnReply={setOnReply}
                        commentId={comment._id}>
                        <Link 
                            to={`/profile/${auth.user._id}`}
                            className="mr-1">
                            @{auth.user.username}
                        </Link>
                    </InputComment>
                )
            }
            {children}
        </div>
    )
}

export default CommentCard
