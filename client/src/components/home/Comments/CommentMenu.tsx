import React from 'react'
import { AuthState } from 'store/types/authTypes'
import { CommentData, PostData } from 'store/types/postTypes'

interface CommentMenuProps {
    auth: AuthState
    post: PostData
    comment: CommentData
}

const CommentMenu: React.FC<CommentMenuProps> = ({ auth, post, comment }) => {
    const MenuItem = () => {
        return(
            <>
                <div className="dropdown-item">
                    <span className="material-icons">
                        create
                    </span> Edit
                </div>
                <div className="dropdown-item">
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
