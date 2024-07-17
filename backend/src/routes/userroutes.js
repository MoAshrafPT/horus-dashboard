const express = require('express');
const userController = require('../controllers/usercontroller');
const authController = require('../controllers/authcontroller');

// eslint-disable-next-line new-cap
const userRouter = express.Router();
//public routes
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.delete('/logout', authController.logout);
userRouter.get('/usernameAvailable/:username', userController.usernameAvailable);
userRouter.get('/emailAvailable/:email', userController.emailAvailable);
userRouter.get('/isLoggedIn', authController.isLoggedIn);


module.exports = userRouter;