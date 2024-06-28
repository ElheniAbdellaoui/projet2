const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { fullName, email, password, phone, registerDate, userRole } = req.body;
  const existantUser = await User.findOne({ email });
  if (existantUser) {
    res.status(409).json({ msg: "user already exists with this email" });
  }
  try {
    const newUser = new User({
      fullName,
      email,
      password,
      phone,
      registerDate,
      userRole,
    });

    var salt = await bcryptjs.genSalt(10);

    var hash = await bcryptjs.hash(password, salt);
    newUser.password = hash;
    const secret = config.get("secret");
    const payload = {
      _id: newUser._id,
      fullName: newUser.fullName,
    };
    var token = jwt.sign(payload, secret);
    await newUser.save();
    res.send({
      token,
      User: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phoneNumber,
        registerDate: newUser.registerDate,
        userRole: newUser.userRole,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "wrong informations" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(404).json({ msg: "wrong informations" });
    }
    const payload = {
      _id: user._id,
      fullName: user.fullName,
    };
    const secret = config.get("secret");
    var token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.send(500).json({ msg: error.message });
  }
};

exports.auth = (req, res) => {
  res.send(req.user);
};
