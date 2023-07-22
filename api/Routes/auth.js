const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

//register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });
  try {
    const userDoc = await newUser.save();
    res.status(201).json(userDoc);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password: pass } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(401).json("Wrong Credintials");
    }
    const bytes = CryptoJS.AES.decrypt(userDoc.password, process.env.PASS_SEC);
    const storedPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (storedPassword !== pass) {
      return res.status(401).json("Wrong Credintials");
    }
    const accessToken = jwt.sign(
      { id: userDoc._id, isAdmin: userDoc.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...others } = userDoc._doc;
    res.status(200).json({...others,accessToken});
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
