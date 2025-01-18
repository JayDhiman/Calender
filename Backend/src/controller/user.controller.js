import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiError } from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { User } from "../models/user.model.js";
import  jwt  from "jsonwebtoken";
import validator from "validator";
import sendMail from "../service/emailService.js";



// ***************** function for genrating the access and Refresh Token ***********************

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error || "Something went wrong while generating referesh and access token"
    );
  }
};

// ******************* Register a user ************************

 const registerUser = asyncHandler(async (req, res) => {
  // need to fetch the data from the body
  // need to apply the validations
  // create a user in db
  // remove password and refresh token field from response
  // return the res

  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
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
