import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { asyncHandler } from "../utilities/asyncHandler.js"
import { ApiError } from '../utilities/apiError.js';

export const protect = asyncHandler(async (req, res, next) => {
    // Check if the token is sent via cookies
    const { token } = req.cookies;

    if (!token) {
        return next(new ApiError('Please login to access this resource', 401));
    }

    try {
        // Verify the token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to the request object
        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            return next(new ApiError('User not found', 404));
        }

        next(); // Proceed to next middleware/route handler
    } catch (error) {
        console.error('Token verification failed:', error); // Log the error for debugging

        if (error.name === 'TokenExpiredError') {
            return next(new ApiError('Token has expired, please login again', 401));
        }

        // Handle other JWT verification errors
        return next(new ApiError('Invalid token, please login again', 401));
    }
});
