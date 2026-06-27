import express from 'express';
import { loginUser, registerUser, resetPassowrd } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassowrd)

export default router;