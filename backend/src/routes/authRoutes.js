const express = require("express");
const { register, login, refreshToken, logout } = require("../controller/authController");
const router = express.Router();
const {registerSchema, loginSchema} = require("../validators/authValidator");
const validate = require("../middleware/validator");

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.post("/refresh",refreshToken);
router.post("/logout",logout);

module.exports=router;
