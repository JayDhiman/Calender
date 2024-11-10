import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiError } from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utilities/jwtToken.js";

// Register a user
export const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next(new ApiError(400, "User already exists with this email"));
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const response = new ApiResponse(201, user, "User registered successfully");
    sendToken(user, 201, res, response);
});

// Login User 
export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new ApiError(400, "Please provide email and password"));
    }

    // Fetch user with the provided email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ApiError(401, "Incorrect email or password"));
    }

    // Compare passwords
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return next(new ApiError(401, "Incorrect email or password"));
    }

    const response = new ApiResponse(200, user, "User logged in successfully");
    sendToken(user, 200, res, response);
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    const response = new ApiResponse(200, null, "User logged out successfully");
    res.status(response.statusCode).json(response);
});

// Get User details
export const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
   
    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    const response = new ApiResponse(200, user, "User updated successfully");
    res.status(response.statusCode).json(response);
});
