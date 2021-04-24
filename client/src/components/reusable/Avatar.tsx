import React from 'react';

interface AvatarProps {
    src: string
    theme?: boolean
    size: string
}

const Avatar: React.FC<AvatarProps> = ({ src, theme, size }) => (
    <img
        src={src}
        alt="user avatar"
        className={size}
        style={{
            filter: `${theme ? 'invert(1)' : 'invert(0)'}`
        }} />
)


export default Avatar
