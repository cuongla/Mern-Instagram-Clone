/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import { Profile } from 'store/types/userTypes';
import { IParams } from 'typings/params';
import Avatar from 'components/reusable/Avatar';
import { getProfileUsers } from 'store/actions/profileActions';
import EditProfile from './EditProfile';
import FollowBtn from './FollowBtn'

const UserInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();
    const { auth, profile } = useSelector((state: RootState) => state);

    const [userData, setUserData] = useState<Profile[]>([]);
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        dispatch(getProfileUsers(profile.users, id, auth))
        const newData = profile.users.filter(user => user._id === id);
        setUserData(newData);
    }, [id, dispatch, profile, auth]);

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
                                    user._id === auth.user._id 
                                    ? (
                                        <button 
                                        className="btn btn-outline-info"
                                        onClick={() => setOnEdit(true)}>
                                        Edit Profile
                                    </button>
                                    )
                                    : (
                                        <FollowBtn />
                                    )
                                }
                            </div>
                            <div className="follow_btn">
                                <span style={{ marginRight: '24px' }}>
                                    {user.followers.length} Followers
                        </span>
                                <span style={{ marginLeft: '24px' }}>
                                    {user.followers.length} Following
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
                    </div>
                ))
            }
        </div>
    )
}

export default UserInfo


// {
//     userData.map((user: any) => (
//         <div
//             key={user._id} 
//             className="info_container">
//                 <Avatar 
//                     src={user.avatar}
//                     size="extra-big-avatar" />
//         </div>
//     ))
// }