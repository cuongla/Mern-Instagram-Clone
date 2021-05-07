import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { CommentData, PostData } from 'store/types/postTypes'
import { deleteComment } from 'store/actions/commentActions';

interface CommentMenuProps {
    post: PostData
    comment: CommentData
    setOnEdit: any
}

const CommentMenu: React.FC<CommentMenuProps> = ({ post, comment, setOnEdit }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);

    const handleRemove = () => {
        // check for comment owner
        if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
            dispatch(deleteComment(post, comment, auth));
        }
    }

    const MenuItem = () => {
        return (
            <>
                <div
                    className="dropdown-item"
                    onClick={() => setOnEdit(true)}>
                    <span className="material-icons">
                        create
                    </span> Edit
                </div>
                <div
                    className="dropdown-item"
                    onClick={handleRemove}>
                    <span className="material-icons">
                        delete_outline
                    </span> Remove
                </div>
            </>
        )
    }

    return (
        <div className="menu">
            {
                (post.user._id === auth.user?._id || comment.user._id === auth.user?._id) && (
                    <div className="nav-item dropdown">
                        <span
                            className="material-icons"
                            id="moreLink"
                            data-bs-toggle="dropdown">
                            more_vert
                        </span>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="moreLink">
                            {
                                post.user._id === auth.user.id
                                    ? comment.user._id === auth.user._id
                                        ? MenuItem()
                                        : (
                                            <div className="dropdown-item">
                                                <span className="material-icons">
                                                    delete_outline
                                                </span> Remove
                                            </div>
                                        )
                                    : comment.user._id === auth.user._id && MenuItem()
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CommentMenu
