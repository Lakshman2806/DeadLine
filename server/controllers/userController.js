const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

// MongoDB has id as _id
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};
//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  // res.json({ message: "login user" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  //   res.json({ message: "signup user" });
};

module.exports = { loginUser, signupUser };
