import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { login } from 'store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { LoginData } from 'store/types/authTypes';
import { RootState } from 'store';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userData, setUserData] = useState<LoginData>({
        email: '',
        password: ''
    });
    const { email, password } = userData;
    const [typePass, setTypePass] = useState(false);
    const { auth } = useSelector((state: RootState) => state);

    useEffect(() => {
        if(auth.token) history.push('/');
    }, [dispatch, auth, history]);

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
