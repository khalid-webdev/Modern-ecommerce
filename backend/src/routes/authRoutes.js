const express = require("express");
const { register } = require("../controller/authController");
const router = express.Router();
const {registerSchema, loginSchema} = require("../validators/authValidator");
const validate = require("../middleware/validator");

router.post("/register",validate(registerSchema),register);


module.exports=router;
