import mongoose, { Schema } from 'mongoose'
import { IPost } from '../interfaces/post.interface';

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

export default mongoose.model<IPost>('comment', CommentSchema);
