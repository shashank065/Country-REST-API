// authRoutes.js

import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const authRoutes = Router();
// User registration route
authRoutes.post('/register', registerUser);

// User login route
authRoutes.post('/login', loginUser);

export default authRoutes;
