import { Router } from "express";;
import { refreshAccessToken ,registerUser,loginUser,logoutUser, getUserDetails, changeCurrentPassword, forgetPassword, resetPassword, } from '../controller/user.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();



router.post('/register', registerUser);
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/me").get(verifyJWT,getUserDetails)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)


router.route("/forget-password").post(forgetPassword)
router.route("/reset-password").post(resetPassword)





export default router;
