const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../utils/authUtils");
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const token = generateToken(user._id);
    res.redirect('/main');
    // res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET
    );
      res.redirect('/login')
    // res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.logout = (req, res) => {
  res.redirect("/login");
};
