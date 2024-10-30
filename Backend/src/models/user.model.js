import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import crypto from 'crypto';



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [30, "Name cannot exceed 30 characters"],
        minlength: [2, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, "Password must be greater than 6 characters"],
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });


// Encrypt password before saving user

// we are hashing password before save that's why we use pre also we are further use the profile update feature whe user update their Profile it will check that profile has been update and again it will hashed the Password ,so to overcome this situation we are using condtion

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

    

// Compare user entered password with hashed password in the database
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};



userSchema.methods.getResetPasswordToken = function () {
    // Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to `resetPasswordToken` field in the schema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the token expiration time (e.g., 30 minutes from now)
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes in milliseconds

    // Return the unhashed reset token (to be sent to the user)
    return resetToken;
};



export const User = mongoose.model("User", userSchema);
