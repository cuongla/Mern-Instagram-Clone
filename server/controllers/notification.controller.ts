import { Response } from 'express';
import { IRequest } from '../interfaces/request.interface';
import Notifications from '../models/notification.model';

const notificationCtrl = {
    addNotification: async (req: IRequest, res: Response) => {
        const { id, recipients, url, text, content, image } = req.body;

        // check receipients 
        if (recipients.includes(req.user._id.toString())) return;

        try {
            const notification = new Notifications({
                id, recipients, url, text, content, image, user: req.user._id
            });

            await notification.save();
            return res.status(200).json({ notification });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    removeNotification: async (req: IRequest, res: Response) => {
        try {
            const notification = await Notifications.findOneAndDelete({
                id: req.params.id, url: req.query.url
            });

            return res.json({ notification });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    getNotifications: async (req: IRequest, res: Response) => {
        try {
            const notifications = await Notifications
                .find({recipients: req.user._id})
                .sort('-createdAt')
                .populate('user', 'avatar username');
            
            return res.json({notifications});
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    isReadNotification: async (req: IRequest, res: Response) => {
        try {
            const notification = await Notifications.findOneAndUpdate({_id: req.params.id}, {
                isRead: true
            });

            return res.json({ notification });
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
    removeAllNotification: async (req: IRequest, res: Response) => {
        try {
            const notifictions = await Notifications.deleteMany({recipients: req.user._id})
            
            return res.json({notifictions})
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            });
        }
    },
}

export default notificationCtrl;