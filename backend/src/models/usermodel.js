const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    lowercase: true,
    minlength: 4,
    maxlength: 20,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  phone: {
    type: String,
    required: [true, "please add a phone number"],
    validate: {
        validator: function (el) {
            return el.match(/^01[0-2,5]{1}[0-9]{8}$/i) !== null;
          },
          message: "Please enter a valid egyptian number!",
    }
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},
{
    timestamps: true
}
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//compare user given password with candidate password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // this.password wont work here anymore as we made password select:false (not visible)
  // candidate pass is not hashed (original pass from user), userpassword is hashed
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
