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
                .populate('followers following', '-password')

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
    },
    followUser: async (req: IRequest, res: Response) => {
        try {
            const user = await User.find({ _id: req.params.id, followers: req.user._id });

            if (user.length > 0) return res.status(500).json({
                msg: 'You already followed this person.'
            });

            // update followers
            await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        // @ts-ignore
                        followers: req.user._id
                    }
                },
                {
                    new: true
                }
            );

            // update followings
            await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        // @ts-ignore
                        following: req.params.id
                    }
                },
                {
                    new: true
                }
            );

            res.json({ msg: 'Followed User.' });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    unfollowUser: async (req: IRequest, res: Response) => {
        try {
            // update followers
            await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: {
                        // @ts-ignore
                        followers: req.user._id
                    }
                },
                {
                    new: true
                }
            );

            // update followings
            await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $pull: {
                        // @ts-ignore
                        following: req.params.id
                    }
                },
                {
                    new: true
                }
            );

            res.json({ msg: 'You have unfollowed the person.' });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    }
}

export default userCtrl;