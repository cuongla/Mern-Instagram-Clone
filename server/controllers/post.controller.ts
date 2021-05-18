import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import Posts from '../models/post.model';
import Comments from '../models/comment.model';
import Users from '../models/user.model';
import { APIfeatures } from '../utils/APIFeatures';

const postCtrl = {
    createPost: async (req: IRequest, res: Response) => {
        const { content, images } = req.body;

        if (images.length === 0) return res.status(400).json({
            msg: "Please add your photo."
        });

        try {
            const newPost = new Posts({ content, images, user: req.user._id });

            // save post and return post
            await newPost.save();
            res.json({
                msg: 'Created Post!',
                newPost: { ...newPost._doc, user: req.user }
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    getPosts: async (req: IRequest, res: Response) => {
        try {
            const postFeatures = new APIfeatures(
                Posts.find({
                    user: [...req.user.following, req.user._id]
                }),
                req.query)
                .paginating();

            const posts = await postFeatures.query.sort('-createdAt')
                .populate("user likes", "avatar username fullname")
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user likes',
                        select: '-password'
                    }
                });

            res.json({
                msg: 'Successfully Loaded!',
                result: posts.length,
                posts
            });
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
                    { content, images }
                )
                .populate("user likes", "avatar username fullname")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });

            res.json({
                msg: 'Updated Post!',
                newPost: { ...post._doc, content, images }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deletePost: async (req: IRequest, res: Response) => {
        try {
            const post = await Posts.findOneAndDelete({
                _id: req.params.id,
                user: req.user._id
            });

            // check post
            if (!post) return res.status(400).json({ msg: 'This post does not exist.' });

            // delete all comments once post is deleted
            await Comments.deleteMany({ _id: { $in: post.comments } })

            res.json({
                msg: 'Deleted Post!',
                newPost: {
                    ...post,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    likePost: async (req: IRequest, res: Response) => {
        try {
            const post = await Posts.find({
                _id: req.params.id,
                likes: req.user._id
            });

            // check like
            if (post.length > 0) return res.status(400).json({ msg: 'You already liked this post!' });

            // update likes
            const selectedPost = await Posts
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { likes: req.user._id } },
                    { new: true });

            // check post 
            if (!selectedPost) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({ msg: 'Liked Post!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    unlikePost: async (req: IRequest, res: Response) => {
        try {
            // update likes
            const selectedPost = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { likes: req.user._id } },
                { new: true });

            // check post 
            if (!selectedPost) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({ msg: 'Unliked Post!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    getUserPosts: async (req: IRequest, res: Response) => {
        try {
            const postFeatures = new APIfeatures(Posts.find({ user: req.params.userId }), req.query).paginating();

            const posts = await postFeatures.query.sort("-createdAt");

            res.json({
                posts,
                result: posts.length
            })
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
            // check post
            if (!post) return res.status(400).json({ msg: 'This post does not exist.' })

            res.json({ post });
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    getPostDiscover: async (req: IRequest, res: Response) => {
        try {
            const newArr = [...req.user.following, req.user._id]

            const num = req.query.num || 9

            // get posts in random
            const posts = await Posts.aggregate([
                { $match: { user: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
            ])

            return res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    savePost: async (req: IRequest, res: Response) => {
        try {
            const user = await Users.find({
                _id: req.user._id,
                savedPost: req.params.id
            });

            // check if post is saved 
            if (user.length > 0) return res.status(400).json({ msg: "You saved this post." })

            // save post
            const seletedPost = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { saved: req.params.id } },
                { new: true });

            // check post
            if (!seletedPost) return res.status(400).json({ msg: 'This user does not exist.' });

            res.status(200).json({ msg: 'Post is saved!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    unsavePost: async (req: IRequest, res: Response) => {
        try {
            const savedPosts = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { savedPost: req.params.id } },
                { new: true });

            if (!savedPosts) return res.status(400).json({ msg: 'This user does not exist.' });

            res.json({ msg: 'Post is Removed!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getSavedPosts: async (req: IRequest, res: Response) => {
        try {
            const postFeatures = new APIfeatures(Posts.find({
                _id: { $in: req.user.savedPost }
            }), req.query).paginating();

            const savedPosts = await postFeatures.query.sort("-createdAt");

            res.json({
                savedPosts,
                result: savedPosts.length
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default postCtrl;