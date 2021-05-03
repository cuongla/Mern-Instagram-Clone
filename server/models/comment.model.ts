import mongoose, { Schema, SchemaTypes } from 'mongoose'
import { IPost } from '../interfaces/post.interface';

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
    }
}, {
    timestamps: true
});

export default mongoose.model<IPost>('comment', CommentSchema);
