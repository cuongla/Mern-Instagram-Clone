import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import Messages from '../models/message.model';
import Chats from '../models/chat.model';
import { APIfeatures } from '../utils/APIFeatures';

const messageCtrl = {
    addMessage: async (req: IRequest, res: Response) => {
        const { sender, recipient, text, media, call } = req.body

        // check recipient
        if (!recipient || (!text.trim() && media.length === 0 && !call)) return;

        try {
            // create a chat room
            const newChat = await Chats.findOneAndUpdate({
                $or: [
                    { recipients: [sender, recipient] },
                    { recipients: [recipient, sender] }
                ]
            },
                {
                    recipients: [sender, recipient],
                    text, media, call
                },
                { new: true, upsert: true });

            // add message
            const newMessage = new Messages({
                chat: newChat._id,
                sender, call,
                recipient, text, media
            });

            await newMessage.save();
            res.json({ msg: 'Create Success!' });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    getChats: async (req: IRequest, res: Response) => {
        try {
            const chatFeatures = new APIfeatures(Chats.find({
                recipients: req.user._id
            }), req.query).paginating();

            const chats = await chatFeatures.query
                .sort('-updatedAt')
                .populate('recipients', 'avatar username fullname');

            res.json({
                chats,
                result: chats.length
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getMessages: async (req: IRequest, res: Response) => {
        try {
            const messageFeatures = new APIfeatures(Messages.find({
                $or: [
                    { sender: req.user._id, recipient: req.params.id },
                    { sender: req.params.id, recipient: req.user._id }
                ]
            }), req.query).paginating();

            const messages = await messageFeatures.query.sort('-createdAt');

            res.json({
                messages,
                result: messages.length
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeMessages: async (req: IRequest, res: Response) => {
        try {
            await Messages.findOneAndDelete({
                _id: req.params.id,
                sender: req.user._id
            });
            res.json({ msg: 'Delete Success!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeChat: async (req: IRequest, res: Response) => {
        try {
            const selectedChat = await Chats.findOneAndDelete({
                $or: [
                    { recipients: [req.user._id, req.params.id] },
                    { recipients: [req.params.id, req.user._id] }
                ]
            });

            // delete all messages realted to chat
            await Messages.deleteMany({ chat: selectedChat._id })

            res.json({ msg: 'Delete Success!' });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default messageCtrl;