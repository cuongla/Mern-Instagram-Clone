import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import Comments from '../models/comment.model';
import Posts from '../models/post.model';


const commentCtrl = {
    createComment: async (req: IRequest, res: Response) => {
        const { content, postId, tag, reply } = req.body;
        try {
            const newComment = new Comments({
                user: req.user._id,
                content,
                tag,
                reply
            });

            // add comments to post
            await Posts.findOneAndUpdate(
                { _id: postId },
                {
                    $push: { comments: newComment._id }
                }
                , { new: true });

            await newComment.save();
            res.json({ newComment });
        } catch (err) {
            return res.status(500).json({
                error: err.message
            })
        }
    },
    updateComment: async (req: IRequest, res: Response) => {
        const { content } = req.body;

        try {
            await Comments.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user._id
                },
                { content }
            );

            res.json({ msg: 'Updated Successful!' })
        } catch (err) {
            return res.status(500).json({
                error: err.message
            })
        }
    },
    likeComment: async (req: IRequest, res: Response) => {
        try {
            const comment = await Comments.find(
                {
                    _id: req.params.id,
                    likes: req.user._id
                });
            if (comment.length > 0) return res.status(400).json({ msg: 'You  liked this post.' });

            // update likes
            await Comments
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { likes: req.user._id } },
                    { new: true });

            res.json({ msg: 'Liked Comment!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    unlikeComment: async (req: IRequest, res: Response) => {
        try {
            // update likes
            await Comments
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $pull: { likes: req.user._id } },
                    { new: true });

            res.json({ msg: 'Unliked Comment!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    }
}

export default commentCtrl;