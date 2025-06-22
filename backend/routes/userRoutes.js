const express = require('express');
const { register, login, getUserProfile } = require('../controllers/userController');
const isAuth = require('../middlewares/authMiddleware');
const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/profile",isAuth,getUserProfile)

module.exports = userRouter