import React from 'react'
import { Profile } from 'store/types/userTypes'
import UserCard from 'components/reusable/UserCard'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import FollowBtn from './FollowBtn'


interface FollowingProps {
    users: any
    setShowFollowing: any
}

const Following: React.FC<FollowingProps> = ({ users, setShowFollowing }) => {
    const { auth } = useSelector((state: RootState) => state);

    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Following</h5>
                <hr />
                {
                    users.map((user: Profile) => (
                        <UserCard 
                            key={user._id} 
                            user={user} 
                            setShowFollowing={setShowFollowing}>
                            {
                                auth.user._id !== user._id && <FollowBtn user={user} />
                            }
                        </UserCard>
                    ))
                }
                <div 
                    className="close" 
                    onClick={() => setShowFollowing(false)}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default Following;
