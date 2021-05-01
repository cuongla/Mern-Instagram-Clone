import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import Posts from '../models/post.model';

const postCtrl = {
    createPost: async (req: IRequest, res: Response) => {
        const { content, images } = req.body;

        if (images.length === 0) return res.status(400).json({
            msg: "Please add your photo."
        });

        try {
            const newPost = new Posts({
                content,
                images,
                user: req.user._id
            });
            await newPost.save();
            res.json({
                msg: 'Post is created.',
                newPost
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    getPosts: async (req: IRequest, res: Response) => {
        try {
            const posts = await Posts
                .find({
                    user: [...req.user.following, req.user._id]
                })
                .populate("user likes", "avatar username fullname");

            res.json({
                msg: 'Successfully Loaded.',
                result: posts.length,
                posts

            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    }
}

export default postCtrl;