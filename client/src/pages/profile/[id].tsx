import React from 'react'
import UserInfo from 'components/Profile/UserInfo';
import UserPosts from 'components/Profile/UserPosts';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import LoadIcon from 'images/loading.gif';

const Profile = () => {
    const { profile } = useSelector((state: RootState) => state);


    return (
        <div className="profile">
            {
                profile.loading 
                    ? <img src={LoadIcon} alt="Loading Icon" className="" />
                    : <UserInfo />
            }
            <UserPosts />
        </div>
    )
}

export default Profile
