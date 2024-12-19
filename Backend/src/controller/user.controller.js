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

//  **************** Login User ********************

 const loginUser = asyncHandler(async (req, res, next) => {
  // fetch the user from body
  // check validations user
  // fetch the user from the db
  // compare password
  // genrate access and refresh token
  //send cookies

  const { username, email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password || !username) {
    return next(
      new ApiError(400, "Please provide username, email and password")
    );
  }

  // fetch user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not Found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return next(new ApiError(401, "Invalid user credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id );

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   // Options for cookie
   const options = {
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    httpOnly: true, // Prevents access to cookie from JavaScript
    sameSite: 'Strict', // Helps prevent CSRF attacks

  };


 return res
 .status(200)
 .cookie("accessToken", accessToken, options )
 .cookie("refreshToken", refreshToken, options )
 .json(
    new ApiResponse(
        200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
    )
)
 });

// ************************* Logout User ********************

 const logoutUser = asyncHandler(async (req, res) => {
   
     await User.findByIdAndUpdate( req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            } 
        },
        {
            new: true
        }
     )

     const options = {
      httpOnly: true,
      secure: true
  }
     return res
     .status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(new ApiResponse(200, {}, "User logged Out"))

    });


    const refreshAccessToken = asyncHandler(async (req, res) => {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if (!incomingRefreshToken) {
            throw new ApiError(401, "unauthorized request")
        }
    
        try {
            const decodedToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )
        
            const user = await User.findById(decodedToken?._id)
        
            if (!user) {
                throw new ApiError(401, "Invalid refresh token")
            }
        
            if (incomingRefreshToken !== user?.refreshToken) {
                throw new ApiError(401, "Refresh token is expired or used")
                
            }
        
            const options = {
                httpOnly: true,
                secure: true
            }
        
            const {accessToken, refreshToken:newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
        
            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200, 
                    {accessToken, refreshToken: newRefreshToken},
                    "Access token refreshed"
                )
            )
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid refresh token")
        }
    
    })



    // ******************** UserDetails****************

    const getUserDetails =  asyncHandler(async (req,res)=>{
      
      const user = await User.findById(req.user._id).select("-password -refreshToken")

      if(!user){
        throw new ApiError(404,"User not found")
      }

      
      return res
      .status(200)
      .json(
        new ApiResponse(200,user,"User found succesfully")
      )

    })

    // ******************* update User detials *********************

    const updateUserDetails =  asyncHandler(async(req,res)=>{
       
      const { fullName, email, username } = req.body;

     
  // Validation Checks
  if (!fullName || fullName.trim().length < 3) {
    throw new ApiError(400, "Full name must be at least 3 characters long");
  }

  if (!username || username.trim().length < 3) {
    throw new ApiError(400, "Username must be at least 3 characters long");
  }

  if (email && !validator.isEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
    _id: { $ne: req.user._id }, // Exclude current user
  });

  if (existingUser) {
    throw new ApiError(400, "Username or email already exists");
  }

    const user = await User.findByIdAndUpdate( req.user._id,{
     fullName,
     email,
     username},
     { new: true, runValidators: true }
    ).select("-password -refreshToken")

    
    if(!user){
      throw new ApiError(404,"User not Found")
    }


  return res
  .status(200)
  .json(
    new ApiResponse(200, user, "User Profile has been Update succesfully")
  )

})

//  *************** Change Password *************
const changeCurrentPassword = asyncHandler(async(req, res) => {
  const {oldPassword, newPassword} = req.body

  

  const user = await User.findById(req.user?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password")
  }

  user.password = newPassword
  await user.save({validateBeforeSave: false})

  return res
  .status(200)
  .json(new ApiResponse(200, {}, "Password changed successfully"))
})

// ******************* forget password **********************

  const forgetPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    
    if(!email){
      throw new ApiError(400,"Email is required")
    }

    const user = await User.findOne({email})
    
    if (!user) {
      throw new ApiError(404, "User with this email does not exist");
    }

    // generate the refreshToken

    const resetToken = user.generateRefreshToken();

    // Save the reset token and expiration in the database
  user.resetPasswordToken = resetToken; // Store token
  user.resetPasswordExpires = Date.now() + 300000; // Set token to expire in 10 minutes
  await user.save({validateBeforeSave:false});

    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${resetToken}`;

      const message = `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}" target="_blank">${resetURL}</a>
      <p>If you did not request this, please ignore this email.</p>
      `;

      await sendMail({
        email: user.email,
        subject: "Password Reset Request",
        message: null,
        html: message,
      });
    
      res
        .status(200)
        .json(new ApiResponse(200, "Password reset email sent successfully"));

      })

// ****************** reset Password ********************

      const resetPassword = asyncHandler(async (req, res) => {
        const { token } = req.params;
        const { newPassword } = req.body;
      
        if (!newPassword) {
          throw new ApiError(400, "New password is required");
        }
      
        // Verify the reset token
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
          throw new ApiError(400, "Invalid or expired reset token");
        }
      
        const user = await User.findById(decoded.userId);
      
        if (!user || user.resetPasswordExpires < Date.now()) {
          throw new ApiError(400, "Reset token has expired");
        }
      
        // Validate password strength
        if (
          !validator.isStrongPassword(newPassword, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          throw new ApiError(400, "Password is not strong enough");
        }
      
        // Update the user's password
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
      
        await user.save();
      
        res
          .status(200)
          .json(new ApiResponse(200, "Password reset successfully"));
      });
  

    export {
        registerUser,
        loginUser,
        logoutUser,
        refreshAccessToken,
        getUserDetails,
        updateUserDetails,
        changeCurrentPassword,
        forgetPassword,
        resetPassword
        
    }
