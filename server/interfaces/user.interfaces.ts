import { Document } from "mongoose";
import { IPost } from "./post.interface";

export interface IUser extends Document {
    fullname: string
    username: string
    email: string
    password: string
    avatar: string
    role: string
    gender: string
    mobile: string
    address: string
    story: string
    website: string
    followers: any
    following: any
    socketId?: string
    savedPost: IPost[]
}
