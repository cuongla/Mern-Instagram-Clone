import express, { Router } from 'express';
import userCtrl from '../controllers/user.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();


router.get('/search', isAuth, userCtrl.searchUser);

router.get('/user/:id', isAuth, userCtrl.getUser);

router.patch('/user/:id', isAuth, userCtrl.updateUser);

router.patch('/user/:id/follow', isAuth, userCtrl.followUser);

router.patch('/user/:id/unfollow', isAuth, userCtrl.unfollowUser);


export default router;