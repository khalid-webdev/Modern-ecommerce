const express = require("express");
const auth = require("../middleware/authMiddleware")
const router = express.Router();
const { getMe} = require("../controller/userController");


router.use(auth);
router.get("/me",getMe);


module.exports = router;
