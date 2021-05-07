import React, { useState, useEffect, Dispatch } from 'react';
import { Profile, ProfileState, User } from 'store/types/userTypes';
import Avatar from 'components/reusable/Avatar';
import EditProfile from './EditProfile';
import FollowBtn from './FollowBtn'
import Followers from './Followers';
import Following from './Following';
import { global_types } from 'store/types/globalTypes';
import { AuthState } from 'store/types/authTypes';

export interface UserInfoProps {
    id: string
    profile: ProfileState
    auth: AuthState
    dispatch: Dispatch<any>
}

const UserInfo: React.FC<UserInfoProps> = ({ auth, id, profile, dispatch }) => {
    const [userData, setUserData] = useState<Profile[]>([]);
    const [onEdit, setOnEdit] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);


    useEffect(() => {
        const newData = profile.users.filter((user: Profile) => user._id === id);
        setUserData(newData);
    }, [id, profile.users]);

    useEffect(() => {
        if(showFollowers || showFollowing || onEdit) {
            dispatch({ type: global_types.MODAL, payload: true })
        } else {
            dispatch({ type: global_types.MODAL, payload: false })
        }
    }, [dispatch, onEdit, showFollowers, showFollowing]);

    return (
        <div className="info">
            {
                userData.map((user) => (
                    <div
                        key={user._id}
                        className="info_container">
                        <Avatar
                            src={user.avatar}
                            size="extra-big-avatar" />
                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{user.username}</h2>
                                {
                                    user._id === ((auth.user as User) as User)._id
                                        ? (
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => setOnEdit(true)}>
                                                Edit Profile
                                            </button>
                                        )
                                        : (
                                            <FollowBtn user={user} />
                                        )
                                }
                            </div>
                            <div className="follow_btn">
                                <span
                                    onClick={() => setShowFollowers(true)}
                                    style={{ marginRight: '24px' }}>
                                    {
                                        user._id === (auth.user as User)._id
                                            ? (auth.user as User).followers.length
                                            : user.followers.length
                                    } Followers
                                </span>
                                <span
                                    onClick={() => setShowFollowing(true)}
                                    style={{ marginLeft: '24px' }}>
                                    {
                                        user._id === (auth.user as User)._id
                                            ? (auth.user as User).following.length
                                            : user.following.length
                                    } Following
                                </span>
                            </div>
                            <h6>{user.fullname} - <span className="text-danger">{user.mobile}</span></h6>
                            <p className="m-0">{user.address}</p>
                            <h6 className="m-0">{user.email}</h6>
                            <a
                                href={user.website}
                                target="_blank"
                                rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                        </div>
                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }
                        {
                            showFollowers && (
                                <Followers
                                    users={user.followers}
                                    setShowFollowers={setShowFollowers} />
                            )
                        }
                        {
                            showFollowing && (
                                <Following
                                    users={user.following}
                                    setShowFollowing={setShowFollowing} />
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default UserInfo;