import { Document } from 'mongoose';
import { IUser } from './user.interfaces';

export interface IChat extends Document {
    recipients: IUser[]
    text: string
    media: any[]
    call: Object
}