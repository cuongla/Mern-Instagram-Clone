import express, { Router } from 'express';
import commentCtrl from '../controllers/commentCtrl';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.post('/comment', isAuth, commentCtrl.createComment);


export default router;