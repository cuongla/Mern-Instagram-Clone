import React, { useEffect, useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from 'store';
import { RegisterData } from 'store/types/authTypes';
import { register } from 'store/actions/authActions';

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { auth, alert } = useSelector((state: RootState) => state);
    const [typePass, setTypePass] = useState(false);
    const [userData, setUserData] = useState<RegisterData>({
        fullname: '',
        username: '',
        email: '',
        password: '',
        // confirmPassword: '',
        gender: ''
    });
    const { fullname, username, email, password, gender } = userData;

    useEffect(() => {
        if (auth.token) history.push('/');
    }, [history, auth]);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(register(userData));
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">InstaKram</h3>
                <div className="mb-3">
                    <label
                        htmlFor="fullname"
                        className="form-label">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        className="form-control"
                        id="fullname"
                        onChange={handleChangeInput}
                        value={fullname}
                        style={{ background: `${alert.errMsg.fullname ? '#fd2d6a14' : ''}` }} />
                    <small className="form-text text-danger">
                        {alert.errMsg.fullname ? alert.errMsg.fullname : ''}
                    </small>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="username"
                        className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        id="username"
                        onChange={handleChangeInput}
                        value={username.toLowerCase().replace(/ /g, '')}
                        style={{ background: `${alert.errMsg.username ? '#fd2d6a14' : ''}` }} />
                    <small className="form-text text-danger">
                        {alert.errMsg.username ? alert.errMsg.username : ''}
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        onChange={handleChangeInput}
                        value={email}
                        style={{ background: `${alert.errMsg.email ? '#fd2d6a14' : ''}` }} />
                    <small className="form-text text-danger">
                        {alert.errMsg.email ? alert.errMsg.email : ''}
                    </small>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="pass">
                        <input
                            type={!typePass ? "password" : "text"}
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={handleChangeInput}
                            value={password}
                            name="password"
                            style={{ background: `${alert.errMsg.password ? '#fd2d6a14' : ''}` }} />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                    <small className="form-text text-danger">
                        {alert.errMsg.password ? alert.errMsg.password : ''}
                    </small>
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Confirmation Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        onChange={handleChangeInput}
                        value={confirmPassword}
                        name="confirmPassword" style={{ background: `${alert.errMsg.confirmPassword ? '#fd2d6a14' : ''}` }} />
                    <small className="form-text text-danger">
                        {alert.errMsg.confirmPassword ? alert.errMsg.confirmPassword : ''}
                    </small>
                </div> */}
                <div className="row mx-0 mb-1 justify-content-between">
                    <label htmlFor="male">
                        Male: <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            defaultChecked
                            checked={gender === 'male'}
                            onChange={handleChangeInput} />
                    </label>
                    <label htmlFor="female">
                        Female: <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={handleChangeInput} />
                    </label>
                    <label htmlFor="other">
                        Other: <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            checked={gender === 'other'}
                            onChange={handleChangeInput} />
                    </label>
                </div>
                <button
                    type="submit"
                    className="btn btn-dark w-100">
                    Register
                </button>
                <p className="my-2">
                    Already have an account ? <Link to="/" style={{ color: 'crimson' }}>Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
