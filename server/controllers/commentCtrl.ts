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
                ,{ new: true});

                await newComment.save();
                res.json({ newComment });
        } catch(err) {
            return res.status(500).json({
                error: err.message
            })
        }
    }
}

export default commentCtrl;