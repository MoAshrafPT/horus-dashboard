const userModel = require("../models/usermodel");
const AppError = require("../utils/apperror");
const catchAsync = require("../utils/catchasync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    //sameSite: "None",
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return next(
      new AppError("Please provide username, email and password", 400)
    );
  }
  let user;
  if (email) {
    user = await userModel.findOne({ email }).select("+password");
  }
  if (username && !user) {
    user = await userModel.findOne({ username }).select("+password");
  }
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect username, email or password", 401));
  }
  createSendToken(user, 200, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return next(new AppError("Email already exists", 400));
  }
  user = await userModel.findOne({ username: req.body.username });
  if (user) {
    return next(new AppError("Username already exists", 400));
  }

  const { username, email, password, passwordConfirm, phone ,isAdmin } = req.body;

  if (!username || !email || !password || !passwordConfirm || !phone ) {
    return next(
      new AppError(
        "Please provide username, email, password, passwordConfirm and phone ",
        400
      )
    );
  }

  const newUser = await userModel.create({
    username,
    email,
    password,
    passwordConfirm,
    phone,
    isAdmin
  });

  createSendToken(newUser, 201, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("The user belonging to this token does not exist", 401)
    );
  }
  res.status(200).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("The user belonging to this token does not exist", 401)
    );
  }
  req.body.user = user;
  next();
});
