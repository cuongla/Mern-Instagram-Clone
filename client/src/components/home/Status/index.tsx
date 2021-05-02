import React from 'react';
import Avatar from 'components/reusable/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { profile_types } from 'store/types/userTypes';


const Status: React.FC = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);

    return (
        <div className="status my-3 d-flex">
            <Avatar src={auth.user.avatar} size="big-avatar" />
            <button
                className="statusBtn flex-fill"
                onClick={() => dispatch({
                    type: profile_types.STATUS,
                    payload: true
                })}>
                {auth.user.username}, what are you thinking?
            </button>
        </div>
    )
}

export default Status;
