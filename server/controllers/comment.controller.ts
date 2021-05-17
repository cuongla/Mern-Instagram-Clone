import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import Comments from '../models/comment.model';
import Posts from '../models/post.model';


const commentCtrl = {
    createComment: async (req: IRequest, res: Response) => {
        const { content, postId, tag, reply, postUserId } = req.body;

        try {
            // check post
            const post = await Posts.findById(postId);
            if(!post) return res.status(400).json({msg: "This post does not exist."})

            // create new comment
            const newComment = new Comments({
                user: req.user._id,
                content, tag, reply, postUserId, postId
            });

            // add comments to post

            await Posts.findOneAndUpdate(
                {_id: postId},
                 { $push: {comments: newComment._id}}, 
                 {new: true});

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
            await Comments.findOneAndUpdate({
                    _id: req.params.id,
                    user: req.user._id },
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
            const comment = await Comments.find({
                _id: req.params.id, 
                likes: req.user._id
            });

            if(comment.length > 0) return res.status(400).json({msg: "You already liked this post!"})

            // update likes
            await Comments.findOneAndUpdate(
                { _id: req.params.id }, 
                { $push: {likes: req.user._id}}, 
                {new: true});

            res.json({ msg: 'Liked Comment!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    unlikeComment: async (req: IRequest, res: Response) => {
        try {
            // update likes
            await Comments.findOneAndUpdate(
                    {_id: req.params.id}, 
                    { $pull: {likes: req.user._id}}, 
                    {new: true});

            res.json({ msg: 'Unliked Comment!' })
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    },
    deleteComment: async (req: IRequest, res: Response) => {
        try {
            const comment = await Comments.findOneAndDelete({
                _id: req.params.id,
                $or: [
                    {user: req.user._id},
                    {postUserId: req.user._id}
                ]
            });

            // remove comment from post
            await Posts.findOneAndUpdate(
                { _id: comment.postId }, 
                { $pull: {comments: req.params.id}});

            res.json({ msg: 'Deleted Comments' });
        } catch (err) {
            return res.json(500).json({ msg: err.message });
        }
    }
}

export default commentCtrl;