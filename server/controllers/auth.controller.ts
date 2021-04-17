import { Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IRequest } from '../interfaces/request.interface';


const authCtrl = {
    register: async (req: IRequest, res: Response) => {
        const { fullname, username, email, password, gender } = req.body;
        let newUserName = username.toLowerCase().replace(/ /g, '');

        try {
            // check if username is taken
            const user_name = await User.findOne({ username: newUserName });
            if (user_name) return res.status(400).json({
                msg: 'This username is already taken.'
            });

            // check if email is taken
            const user_email = await User.findOne({ email });
            if (user_email) return res.status(400).json({
                msg: 'This email is already used.'
            });

            // check passwrod
            if (password.length < 6) return res.status(400).json({
                msg: 'Password must be at least 6 chracters'
            });

            // hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // create new user
            const newUser = new User({ fullname, username, email, password: hashedPassword, gender });

            // get token
            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });

            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000
            });
            await newUser.save();

            res.status(201).json({
                msg: 'Register Success!',
                access_token,
                user: {
                    // @ts-ignore
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    login: async (req: IRequest, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await User
                .findOne({ email })
                .populate("followers, following", "-password");

            // check user
            if (!user) return res.status(400).json({
                msg: 'This email is not registered yet.'
            });

            // check passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({
                msg: 'Password is not correct.'
            });

            // get token
            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000
            });

            // return user
            res.status(200).json({
                msg: "Login Succesful.",
                access_token,
                user: {
                    // @ts-ignore
                    ...user._doc,
                    password: ''
                }
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    logout: async (req: IRequest, res: Response) => {
        try {
            res.clearCookie('refreshtoken', {
                path: '/api/refresh_token'
            });

            return res.status(200).json({
                'msg': 'Logged out sucessfully'
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    generateToken: async (req: IRequest, res: Response) => {
        try {
            const rf_token = req.cookies.refreshToken;

            // check token
            if (!rf_token) return res.status(400).json({
                msg: "Please login your account."
            });

            // get user
            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, result) => {
                    if (err) return res.status(400).json({
                        msg: "Please login your account."
                    });

                    const user = await User
                        .findById(result.id)
                        .select("-password")
                        .populate('followers following', "-password");

                    // check user in db
                    if (!user) return res.status(400).json({
                        msg: "This does not exist"
                    });
                    const access_token = createAccessToken({ id: result.id });

                    res.status(200).json({
                        access_token,
                        user
                    });
                });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    }
}

const createAccessToken = (payload: any) => {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
}

const createRefreshToken = (payload: any) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
}

export default authCtrl;