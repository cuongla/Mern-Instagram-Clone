import express, { Router } from 'express';
import userCtrl from '../controllers/user.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();


router.get('/search', isAuth, userCtrl.searchUser);

router.get('/user/:id', isAuth, userCtrl.getUser);

router.patch('/user/:id', isAuth, userCtrl.updateUser);

export default router;