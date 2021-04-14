import React from 'react'

const NotFound: React.FC = () => {
    return (
        <div
            style={{
                minHeight: 'calc(100vh - 70px)'
            }}
            className="position-relative">
            <h2 
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                className="position-absolute text-secondary">
                404 | Not Found.
            </h2>
        </div>
    )
}

export default NotFound
