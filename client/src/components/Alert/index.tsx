import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import Loading from './Loading';
import Toast from './Toast';
import { ALERT } from 'store/types/alertTypes';

const Alert = () => {
    const { alert } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <div>
            { alert.loading && <Loading />}
            { alert.error &&
                <Toast
                    msg={{
                        title: 'Error',
                        body: alert.error
                    }}
                    handleShow={() => dispatch({
                        type: ALERT,
                        payload: {}
                    })}
                    bgColor='bg-danger' />
            }
            { alert.msg &&
                <Toast
                    msg={{
                        title: 'Sucess',
                        body: alert.msg
                    }}
                    handleShow={() => dispatch({
                        type: ALERT,
                        payload: {}
                    })}
                    bgColor='bg-success' />
            }
        </div>
    )
}

export default Alert;
