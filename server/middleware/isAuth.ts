import { NextFunction, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { IRequest } from '../interfaces/request.interface';

const isAuth = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
        !token && res.status(500).json({ msg: 'Authentication Failed' });

        // deconding token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        !decodedToken && res.status(500).json({ msg: 'Authentication Failed' });


        // return user
        const user = await User.findById({ _id: (decodedToken as any).id });

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({
            msg: err.message
        })
    }
}

export default isAuth;