const express = require("express");
const router = express.Router();
const { authUser, registerUser } = require("../controllers/userControllers.js");

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
