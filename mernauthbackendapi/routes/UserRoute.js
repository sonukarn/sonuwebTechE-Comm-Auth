import express from "express";
import UserController from "../controllers/UserController.js";
import CheckUserAuth from "../middleweres/Auth_Middleware.js";
const router = express.Router();

//Route Level Middleware - to protect Route
router.use("/changepassword", CheckUserAuth);
router.use("/loggeduser", CheckUserAuth);

//Public Routes

router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post(
  "/send-reset-password-email",
  UserController.SendUserPasswordResetEmail
);
router.post("/reset-password/:id/:token", UserController.userPasswordReset);
//Protected Routes
router.post("/changepassword", UserController.changeUserPassword);
router.get("/loggeduser", UserController.loggedUser);

export default router;
