import express, { Router } from 'express';
import notificationCtrl from '../controllers/notification.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.post('/notification', isAuth, notificationCtrl.addNotification);

router.delete('/notification/:id', isAuth, notificationCtrl.removeNotification);

router.get('/notifies', isAuth, notificationCtrl.getNotifications);

router.patch('/isReadnotification/:id', isAuth, notificationCtrl.isReadNotification);

router.delete('/deleteAllnotification', isAuth, notificationCtrl.removeAllNotification);


export default router;