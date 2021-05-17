import mongoose, { Schema } from 'mongoose'
import { IMessage } from '../interfaces/message.interface';

const MessageSchema = new Schema({
    conversation: { 
        type: mongoose.Types.ObjectId, 
        ref: 'chat' 
    },
    sender: { 
        type: mongoose.Types.ObjectId, 
        ref: 'user' 
    },
    recipient: { 
        type: mongoose.Types.ObjectId, 
        ref: 'user' 
    },
    text: String,
    media: Array,
    call: Object
}, {
    timestamps: true
});

export default mongoose.model<IMessage>('message', MessageSchema);
