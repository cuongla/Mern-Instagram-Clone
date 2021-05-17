import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import Posts from '../models/post.model';

class APIfeatures {
    query: {
        skip: any
        limit: any
    };
    queryString: number;

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    paginating() {
        const page = this.queryString * 1 || 1;
        const limit = this.queryString * 1 || 3;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

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
            const postFeatures = new APIfeatures(
                Posts
                    .find({
                        user: [...req.user.following, req.user._id]
                    }),
                req.query
            ).paginating();

            const posts = await postFeatures
                .query
                // @ts-ignore
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
            const postFeatures = new APIfeatures(
                Posts
                    .find({
                        user: [...req.user.following, req.user._id]
                    }),
                req.query
            ).paginating();

            const posts = await postFeatures
                .query
                // @ts-ignore
                .sort('-createdAt');
            console.log(posts);
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
    },
    getPostsDsicover: async (req: IRequest, res: Response) => {
        try {
            const postFeatures = new APIfeatures(
                Posts
                    .find({
                        user: {
                            $nin: [...req.user.following, req.user._id]
                        }
                    }),
                req.query
            ).paginating();

            // @ts-ignore
            const posts = await postFeatures.query.sort('-createdAt');

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