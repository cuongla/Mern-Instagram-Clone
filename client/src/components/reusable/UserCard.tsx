import React from 'react';
import { SearchResult } from 'typings/search';
import Avatar from './Avatar';

interface UserCardProps {
    user: SearchResult
    border: string
}

const UserCard: React.FC<UserCardProps> = ({ user, border }) => (
    <div className={`d-flex p-2 align-item-center ${border}`}>
        <Avatar src={user.avatar} size="big-avatar" />
        <div className="ml-1" style={{ transform: 'translateY(-2px)'}}>
            <span className="d-block">{user.username}</span>
            <small style={{ opacity: 0.7 }}>
                {user.fullname}
            </small>
        </div>
    </div>
)

export default UserCard
