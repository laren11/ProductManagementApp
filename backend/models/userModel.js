const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  email,
  password,
  repeatPassword,
  name,
  surname
) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (password != repeatPassword) {
    console.log("PASSWORDS: ", password, " - ", repeatPassword);
    throw Error("Password must match");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    password: hash,
    name,
    surname,
    email,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  console.log("USER: ", user);
  return user;
};

module.exports = mongoose.model("User", userSchema);
