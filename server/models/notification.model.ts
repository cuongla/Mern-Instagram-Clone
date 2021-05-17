import mongoose, { Schema } from 'mongoose'
import { INotification } from '../interfaces/notification.interface';

const NotificationSchema = new Schema({
    id: mongoose.Types.ObjectId,
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'user' 
    },
    recipients: [mongoose.Types.ObjectId],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

export default mongoose.model<INotification>('notify', NotificationSchema);
