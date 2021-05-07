import React, { useEffect } from 'react'
import UserInfo from 'components/profile/UserInfo';
import UserPosts from 'components/profile/UserPosts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import LoadIcon from 'images/loading.gif';
import { getProfile } from 'store/actions/profileActions'
import { useParams } from 'react-router';
import { IParams } from 'typings/params';

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();
    const { profile, auth } = useSelector((state: RootState) => state);

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfile(id, auth))
        }
    }, [auth, dispatch, id, profile.ids, profile.users]);

    return (
        <div className="profile">
            <UserInfo
                auth={auth}
                profile={profile}
                id={id}
                dispatch={dispatch} />
            {
                profile.loading
                    ? <img
                        src={LoadIcon}
                        alt="Loading Icon"
                        className="d-block mx-auto my-4" />
                    : <UserPosts
                        auth={auth}
                        profile={profile}
                        id={id}
                        dispatch={dispatch} />
            }
        </div>
    )
}

export default Profile
