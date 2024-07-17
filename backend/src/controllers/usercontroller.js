const userModel = require("../models/usermodel");
const AppError = require("../utils/apperror");
const catchAsync = require("../utils/catchasync");

exports.usernameAvailable = catchAsync(async (req, res, next) => {
  if (!req.params.username) {
    return next(new AppError("Please provide a username", 404));
  }
  const username = req.params.username;
  const user = await userModel.findOne({ username: username });
  if (user || username === "me") {
    return next(new AppError("Username not available", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Username available",
  });
});

exports.emailAvailable = catchAsync(async (req, res, next) => {
  if (!req.params.email) {
    return next(new AppError("Please provide a email", 404));
  }
  const email = req.params.email;
  const user = await userModel.findOne({ email: email });
  if (user) {
    return next(new AppError("Email not available", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Email available",
  });
});



exports.getUserData = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.body.user.id);
  //remove password from user object
  user.password = undefined;
  //check if user is the same as the one requesting data
  if (user.id !== req.body.user.id) {
    return next(new AppError("You are not authorized to view this data", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
