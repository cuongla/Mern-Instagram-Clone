import React from 'react'
import { PostData } from 'store/types/postTypes'
import Avatar from 'components/reusable/Avatar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from 'store';
import { profile_types } from 'store/types/userTypes';

export interface PostCardProps {
    post: PostData
}

const CardHeader: React.FC<PostCardProps> = ({ post }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);
    
    const handleEditPost = () => {
        dispatch({ type: profile_types.STATUS, payload: {...post, onEdit: true}});
    }

    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar
                    src={post.user.avatar}
                    size="big-avatar" />
                <div className="card_name">
                    <h6 className="m-0">
                        <Link
                            className="text-dark"
                            to={`/profile/${post.user._id}`}>
                            {post.user.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>
            <div className="nav-item dropdown">
                <span
                    id="moreLink"
                    className="material-icons"
                    data-bs-toggle="dropdown" 
                    aria-expanded="false">
                    more_horiz
                </span>
                <div className="dropdown-menu">
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div 
                                onClick={handleEditPost}
                                className="dropdown-item">
                                <span className="material-icons">
                                    create
                                    </span>
                                    Edit Post
                                </div>
                            <div className="dropdown-item">
                                <span className="material-icons">
                                    delete_outline
                                    </span>
                                    Remove Post
                                </div>
                        </>
                    }
                    <div className="dropdown-item">
                        <span className="material-icons">
                            content_copy
                        </span>
                            Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader;
