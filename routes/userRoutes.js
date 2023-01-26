const express = require("express");
const router = express.Router();

const registerController = require("../controller/user");

router.post("/login", registerController.loginUser);
router.post("/register", registerController.addUser);

module.exports = router;
