import express, { Router } from 'express';
import authCtrl from '../controllers/auth.controller';
const router: Router = express.Router();


router.post('/register', authCtrl.register);

router.post('/login', authCtrl.login);

router.post('/logout', authCtrl.logout);

router.post('/refresh_token', authCtrl.generateToken);


export default router;