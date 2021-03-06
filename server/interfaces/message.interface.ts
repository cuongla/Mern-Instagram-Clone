import { Document } from 'mongoose';
import { IChat } from './chat.interface';
import { IUser } from './user.interfaces';

export interface IMessage extends Document {
    converstion: IChat
    sender: IUser | string
    recipient: IUser | string
    text: string
    media: string
    call: Object
}

