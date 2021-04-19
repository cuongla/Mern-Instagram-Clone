import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { login } from 'store/actions/authActions';
import { useDispatch } from 'react-redux';
import { LoginData } from 'store/types/authTypes';

const Login = () => {
    const [userData, setUserData] = useState<LoginData>({
        email: '',
        password: ''
    });
    const { email, password } = userData;
    const [typePass, setTypePass] = useState(false);
    const dispatch = useDispatch();

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(login(userData));
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">InstaKram</h3>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        onChange={handleChangeInput}
                        value={email} />
                    <small
                        id="emailHelp"
                        className="form-text text-muted">
                        We'll never share your mail with anyone else.
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
                            name="password" />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide': 'Show'}
                        </small>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={email && password ? false : true}>
                    Login
                </button>
                <p className="my-2">
                    You don't have an account ? <Link to="/register" style={{ color: 'crimson' }}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
