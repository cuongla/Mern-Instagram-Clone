import mongoose, { Schema, SchemaTypes } from 'mongoose'
import { IComment } from '../interfaces/post.interface';

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: Schema.Types.ObjectId,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    postId: Schema.Types.ObjectId,
    postUserId: Schema.Types.ObjectId
}, {
    timestamps: true
});

export default mongoose.model<IComment>('comment', CommentSchema);
