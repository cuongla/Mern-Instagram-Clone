import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interfaces/user.interfaces';

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: {
        type: String,
        default: 'user'
    },
    gender: {
        type: String,
        default: 'male'
    },
    mobile: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    story: {
        type: String,
        default: '',
        maxLength: 200
    },
    website: {
        type: String,
        default: ''
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    savedPost: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }]
}, {
    timestamps: true
});

export default mongoose.model<IUser>('user', UserSchema);
