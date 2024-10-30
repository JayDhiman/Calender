import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
    updateUserProfile,
} from '../controller/user.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.get('/logout', logoutUser);

// Get user details (protected route)
router.get('/me', protect, getUserDetails);

// Update user profile (protected route)
router.put('/me/update', protect, updateUserProfile);

export default router;
