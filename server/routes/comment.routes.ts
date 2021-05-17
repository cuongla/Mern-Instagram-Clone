import express, { Router } from 'express';
import commentCtrl from '../controllers/comment.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.post('/comment', isAuth, commentCtrl.createComment);

router.patch('/comment/:id', isAuth, commentCtrl.updateComment);
;

router.delete('/comment/:id', isAuth, commentCtrl.deleteComment);

router.patch('/comment/:id/like', isAuth, commentCtrl.likeComment);

router.patch('/comment/:id/unlike', isAuth, commentCtrl.unlikeComment);

export default router;