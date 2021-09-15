import { Document } from "mongoose";
import { IUser } from "./user.interfaces";

export interface IComment extends Document {
    content: string
    postId: string 
    tag: object
    reply: any
    likes: IUser[]
    user: IUser
}

export interface IPost extends Document {
    id: string
    content: string
    images: any[]
    likes: IUser[]
    comments: IComment[]
    user: IUser | IUser[] | string
    _doc?: any 
}
 