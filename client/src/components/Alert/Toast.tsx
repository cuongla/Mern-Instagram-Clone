import React from 'react'

interface ToastProps {
    msg?: {
        title: string
        body: string
    } 
    handleShow: () => void
    bgColor: string
}

const Toast: React.FC<ToastProps> = ({ msg, handleShow, bgColor }) => {
    return (
        <div 
            style={{ top: 0, right: '5px', minWidth: '200px', zIndex: 50 }}
            className={`toast show position-fixed text-light ${bgColor}`}>
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light">
                    {msg?.title}
                </strong>
                <button 
                    className="ml-2 mb-1 close text-light"
                    data-dismiss="toast"
                    style={{ outline: 'none !important' }}
                    onClick={handleShow}>
                    &times;
                </button>
            </div>
            <div className="toast-body">
                {msg?.body}
            </div>
        </div>
    )
}

export default Toast
