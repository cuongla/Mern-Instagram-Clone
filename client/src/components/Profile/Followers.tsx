import React from 'react'
import { Profile } from 'store/types/userTypes'
import UserCard from 'components/reusable/UserCard'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import FollowBtn from './FollowBtn'


interface FollowersProps {
    users: any
    setShowFollowers: any
}

const Followers: React.FC<FollowersProps> = ({ users, setShowFollowers }) => {
    const { auth } = useSelector((state: RootState) => state);

    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Followers</h5>
                <hr />
                {
                    users.map((user: Profile) => (
                        <UserCard 
                            key={user._id} 
                            user={user} 
                            setShowFollowers={setShowFollowers}>
                            {
                                auth.user._id !== user._id && <FollowBtn user={user} />
                            }
                        </UserCard>
                    ))
                }
                <div 
                    className="close" 
                    onClick={() => setShowFollowers(false)}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default Followers;
