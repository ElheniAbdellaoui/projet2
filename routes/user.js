const express = require("express");

const {
  validatorMddleware,
  registerRules,
} = require("../middlewares/validator");
const { verifyAuthMiddleware } = require("../middlewares/verifyAuth");
const { register, auth, login } = require("../controllers/usercontrol");
const router = express.Router();
router.post("/register", validatorMddleware, registerRules(), register);
router.post("/login", login);
router.get("/auth", verifyAuthMiddleware, auth);
module.exports = router;
