
const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");

// Inscription
router.post("/register", register);

module.exports = router;
