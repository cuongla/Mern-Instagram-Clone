import React from 'react';

interface AvatarProps {
    src: string
    theme: boolean
}

const Avatar: React.FC<AvatarProps> = ({ src, theme }) => (
    <img
        src={src}
        alt="user avatar"
        className="avatar"
        style={{
            filter: `${theme ? 'invert(1)' : 'invert(0)'}`
        }} />
)


export default Avatar
