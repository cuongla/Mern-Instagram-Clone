import { Document } from "mongoose";

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
}
