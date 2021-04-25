import React from 'react';
import { SearchResult } from 'typings/search';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

interface UserCardProps {
    user: SearchResult
    border: string
    handleClose: () => void
}

const UserCard: React.FC<UserCardProps> = ({ user, border, handleClose }) => {
    const handleCloseAll = () => {
        if(handleClose) handleClose();
    }

    return(
        <div className={`d-flex p-2 align-item-center ${border}`}>
            <div>
                <Link
                    className="d-flex align-item-center"
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
        </div>
    )
}

export default UserCard
