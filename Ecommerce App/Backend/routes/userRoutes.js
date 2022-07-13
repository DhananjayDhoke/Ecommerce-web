const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  ResetPassword,
  getUserDetailes,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingalUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthenticate, authorizeRole } = require("../midleware/authenticate");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/forget/:token").put(ResetPassword);
router.route("/me").get(isAuthenticate, getUserDetailes);
router.route("/password/update").put(isAuthenticate, updatePassword);
router.route("/me/update").put(isAuthenticate, updateProfile);
router.route("/admin/users").get(isAuthenticate,authorizeRole("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthenticate,authorizeRole("admin"),getSingalUser)
.put(isAuthenticate,authorizeRole("admin"),updateUserRole).delete(isAuthenticate,authorizeRole("admin"),deleteUser);



module.exports = router;
