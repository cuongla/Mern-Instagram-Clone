import mongoose, { Schema, SchemaTypes } from 'mongoose'
import { IChat } from '../interfaces/chat.interface';

const ChatSchema = new Schema({
    recipients: [{ 
        type: mongoose.Types.ObjectId, ref: 'user' 
    }],
    text: String,
    media: Array,
    call: Object
}, {
    timestamps: true
});

export default mongoose.model<IChat>('chat', ChatSchema);
