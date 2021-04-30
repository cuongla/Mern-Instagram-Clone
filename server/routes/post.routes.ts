import express, { Router } from 'express';
import postCtrl from '../controllers/post.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();

router.route('/posts')
    .post(isAuth, postCtrl.createPost);


export default router;