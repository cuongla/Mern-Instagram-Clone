import { Document } from "mongoose";
import { IUser } from "./user.interfaces";

export interface IComment extends Document {
    content: string
    postId?: string 
    tag: object
    reply: any
    likes: IUser[]
    user: IUser
}

export interface IPost extends Document {
    content: string
    images: any[]
    likes: IUser[]
    comments: any[]
    user: IUser | IUser[]
    _doc?: any 
}
 