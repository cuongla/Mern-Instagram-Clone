import mongoose, { Schema } from 'mongoose'
import { IPost } from '../interfaces/post.interface';

const PostSchema = new Schema({
    content: String,
    images: {
        type: Array,
        default: []
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

export default mongoose.model<IPost>('post', PostSchema);
