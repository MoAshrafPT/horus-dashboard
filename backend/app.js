const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const AppError = require("./src/utils/apperror.js");
const userRouter = require("./src/routes/userroutes.js");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"], // add deployment origins later
    credentials: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 5000000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server!`, 400));
  // << if u pass error its going to know that its going to stop the whole program and go to the error middleware
});

app.use;
module.exports = app;
