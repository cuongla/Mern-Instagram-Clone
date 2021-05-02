import express, { Router } from 'express';
import postCtrl from '../controllers/post.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.route('/posts')
    .post(isAuth, postCtrl.createPost)
    .get(isAuth, postCtrl.getPosts)

router.route('/post/:id')
    .patch(isAuth, postCtrl.updatePost);

router.patch('/post/:id/like', isAuth, postCtrl.likePost);
router.patch('/post/:id/unlike', isAuth, postCtrl.unlikePost);



export default router;