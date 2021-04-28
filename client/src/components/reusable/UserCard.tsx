import React, { ReactNode } from 'react';
import { SearchResult } from 'typings/search';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

interface UserCardProps {
    user: SearchResult
    border?: string
    handleClose?: () => void
    setShowFollowers?: any
    setShowFollowing?: any
    children?: ReactNode
}

const UserCard: React.FC<UserCardProps> = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing }) => {
    const handleCloseAll = () => {
        if(handleClose) handleClose();
        if(setShowFollowers) setShowFollowers(false);
        if(setShowFollowing) setShowFollowing(false);
    }

    return(
        <div className={`d-flex p-2 align-items-center justify-content-between ${border}`}>
            <div>
                <Link
                    className="d-flex align-items-center"
                    to={`/profile/${user._id}`}
                    onClick={handleCloseAll}>
                    <Avatar src={user.avatar} size="big-avatar" />
                    <div className="ml-1" style={{ transform: 'translateY(-2px)' }}>
                        <span className="d-block">{user.username}</span>
                        <small style={{ opacity: 0.7 }}>
                            {user.fullname}
                        </small>
                    </div>
                </Link>
            </div>
            { children }
        </div>
    )
}

export default UserCard
