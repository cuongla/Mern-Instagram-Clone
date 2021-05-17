import { Document } from "mongoose";
import { IUser } from "./user.interfaces";

export interface INotification extends Document {
    id: string
    user: IUser
    recipients: IUser[],
    url: string
    text: string
    content: string
    image: string
    isRead: boolean
}