const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("db connection success");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
