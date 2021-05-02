import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import Loading from './Loading';
import Toast from './Toast';
import { AlertState, global_types } from 'store/types/globalTypes';

const Alert = () => {
    const { alert } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <div>
            { (alert as AlertState).loading && <Loading />}
            { (alert as AlertState).error &&
                <Toast
                    msg={{
                        title: 'Error',
                        body: (alert as AlertState).error
                    }}
                    handleShow={() => dispatch({
                        type: global_types.ALERT,
                        payload: {}
                    })}
                    bgColor='bg-danger' />
            }
            { (alert as AlertState).msg &&
                <Toast
                    msg={{
                        title: 'Sucess',
                        body: (alert as AlertState).msg
                    }}
                    handleShow={() => dispatch({
                        type: global_types.ALERT,
                        payload: {}
                    })}
                    bgColor='bg-success' />
            }
        </div>
    )
}

export default Alert;
