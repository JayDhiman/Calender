
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utilities/asyncHandler.js';
import { ApiError } from '../utilities/apiError.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ApiError("Please Login to access this resource", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.id);

    if (!req.user) {
        return next(new ApiError("User not found", 404));
    }

    next();
});
