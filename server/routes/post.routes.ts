import express, { Router } from 'express';
import postCtrl from '../controllers/post.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.route('/posts')
    .post(isAuth, postCtrl.createPost)
    .get(isAuth, postCtrl.getPosts)

router.route('/post/:id')
    .patch(isAuth, postCtrl.updatePost)
    .get(isAuth, postCtrl.getPost);

router.patch('/post/:id/like', isAuth, postCtrl.likePost);
router.patch('/post/:id/unlike', isAuth, postCtrl.unlikePost);

router.patch('/savePost/:id', isAuth, postCtrl.savePost);
router.patch('/unSavePost/:id', isAuth, postCtrl.unsavePost);

router.get('/user_posts/:userId', isAuth, postCtrl.getUserPosts);
router.get('/posts/discover', isAuth, postCtrl.getPostDiscover);
router.get('/user_saved_posts', isAuth, postCtrl.getSavedPosts);


export default router;