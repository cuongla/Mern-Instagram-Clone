import express, { Router } from 'express';
import userCtrl from '../controllers/user.controller';
import isAuth from '../middleware/isAuth';
const router: Router = express.Router();


router.get('/users/search', isAuth, userCtrl.searchUser);


export default router;