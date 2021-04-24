import { Request } from 'express';
import { IUser } from './user.interfaces';

export interface IRequest extends Request {
    user: IUser
}   