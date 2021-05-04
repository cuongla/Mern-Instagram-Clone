import express, { Router } from 'express';
import commentCtrl from '../controllers/commentCtrl';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.post('/comment', isAuth, commentCtrl.createComment);
router.patch('/comment/:id', isAuth, commentCtrl.updateComment);
router.patch('/comment/:id/like', isAuth, commentCtrl.likeComment);
router.patch('/comment/:id/unlike', isAuth, commentCtrl.unlikeComment);

export default router;