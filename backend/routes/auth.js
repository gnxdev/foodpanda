import express from 'express';
import { generateToken, refreshToken } from '../controllers/authController.js';


const router = express.Router();

router.post('/token', generateToken);
router.post('/refresh', refreshToken);


export default router;