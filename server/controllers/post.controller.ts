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
                .sort('-createdAt')
                .populate("user likes", "avatar username fullname")
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password'
                    }
                });

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
    },
    updatePost: async (req: IRequest, res: Response) => {
        const { content, images } = req.body;

        try {
            const post = await Posts
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { content, images })
                .populate("user likes", "avatar username fullname");

            res.json({
                msg: 'Updated Post!',
                newPost: {
                    ...post._doc,
                    content,
                    images
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    likePost: async (req: IRequest, res: Response) => {
        try {
            const post = await Posts.find({ _id: req.params.id, likes: req.user._id });
            if (post.length > 0) return res.status(400).json({ msg: 'You  liked this post.' });

            // update likes
            await Posts
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { likes: req.user._id } },
                    { new: true });

            res.json({ msg: 'Liked Post!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    unlikePost: async (req: IRequest, res: Response) => {
        try {
            // update likes
            await Posts
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $pull: { likes: req.user._id } },
                    { new: true });

            res.json({ msg: 'Unliked Post!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    getUserPosts: async (req: IRequest, res: Response) => {
        try {
            const posts = await Posts
                .find({ user: req.params.id })
                .sort('-createdAt');
            res.json({ posts });
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    getPost: async (req: IRequest, res: Response) => {
        try {
            const post = await Posts
                .findById(req.params.id)
                .populate("user likes", "avatar username fullname")
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password'
                    }
                });

            res.json({ post });
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    }
}

export default postCtrl;