const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static method for signing up a user
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled :(");
  }


  if(!(validator.isEmail(email))){
    throw Error("Email is not valid :(");
  }

  if(!validator.isStrongPassword(password)){
    throw Error("Password is not strong enough (\n" +
      "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol)");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  // default is 10 rounds, Higher the number, the more secure the password
  // But it will take more time to hash the password

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static method for logging in a user

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled :(");
  }

  const user = await this.findOne({email});

  if(!user){
    throw Error("Incorrect email :(");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    throw Error("Incorrect password :(");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
