import { Response } from 'express';
import User from '../models/user.model';
import { IRequest } from '../interfaces/request.interface';


const userCtrl = {
    searchUser: async (req: IRequest, res: Response) => {
        try {
            const users = await User
                .find({
                    username: {
                        $regex: req.query.username as string
                    }
                })
                .limit(10)
                .select("fullname username avatar");

            res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    getUser: async (req: IRequest, res: Response) => {
        try {
            const user = await User
                .findById(req.params.id)
                .select('-password')

            // check user
            if (!user) return res.status(400).json({ msg: 'User is not found. ' });

            res.json({ user });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    updateUser: async (req: IRequest, res: Response) => {
        try {
            const { avatar, fullname, mobile, address, story, website, gender } = req.body;

            if (!fullname) return res.status(400).json({ msg: 'Please add your full name.' });
            const user = await User.findOneAndUpdate({ _id: req.params.id }, {
                avatar, fullname, mobile, address, story, website, gender
            });
            await user.save();
            res.json({ msg: 'Your profile is updated.' });

        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    }
}

export default userCtrl;