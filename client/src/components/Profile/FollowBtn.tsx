import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unfollow } from 'store/actions/profileActions';
import { RootState } from 'store';
import { Profile } from 'store/types/userTypes';

interface FollowBtnProps {
    user: Profile
}

const FollowBtn: React.FC<FollowBtnProps> = ({ user }) => {
    const dispatch = useDispatch();
    const { auth, profile } = useSelector((state: RootState) => state);
    const [followed, setFollowed] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(auth.user.following.find((item: any) => item._id === user._id)) {
            setFollowed(true)
        }
    }, [auth.user.following, user._id]);

    const handleFollow = async () => {
        if(load) return;

        setFollowed(true);
        setLoad(true);
        await dispatch(follow(profile.users, user, auth));
        setLoad(false);
    }

    const handleUnfollow = async () => {
        if(load) return;

        setFollowed(false);
        setLoad(true);
        dispatch(unfollow(profile.users, user, auth));
        setLoad(false);
    }

    return (
        <>
            {
                followed
                    ? (
                        <button
                            onClick={handleUnfollow}
                            className="btn btn-outline-danger">
                            Unfollow
                        </button>
                    )
                    : (
                        <button
                            onClick={handleFollow}
                            className="btn btn-outline-info">
                            Follow
                        </button>
                    )

            }
        </>
    )
}

export default FollowBtn
