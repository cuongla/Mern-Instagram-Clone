import express, { Router } from 'express';
import messageCtrl from '../controllers/message.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.post('/message', isAuth, messageCtrl.addMessage)

router.get('/chats', isAuth, messageCtrl.getChats)

router.get('/message/:id', isAuth, messageCtrl.getMessages)

router.delete('/message/:id', isAuth, messageCtrl.removeMessages)

router.delete('/chat/:id', isAuth, messageCtrl.removeChat)

export default router;