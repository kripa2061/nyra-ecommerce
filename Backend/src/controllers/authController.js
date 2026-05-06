import { verifyToken } from "../utils/jwt.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTPUSER,
    pass: process.env.SMTPPASS
  }
});

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   res.cookie("token", token, {
  httpOnly: true,
  secure: false,         // false for localhost
  sameSite: "lax",      // must be lax or none — not strict for cross-port requests
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    try {
      await transporter.sendMail({
        from: process.env.SENDERMAIL,
        to: email,
        subject: "Welcome to Kripa Stack",
        text: `Welcome! You have successfully registered with: ${email}`
      });
    } catch (err) {}

    return res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Password doesn't match" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });

    return res.json({ success: true, message: "Logout Successful" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerify) {
      return res.json({ success: false, message: "User already verified" });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOTP = OTP;
    user.verifyOTPExpireAT = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.SENDERMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${OTP}`
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { OTP } = req.body;

  if (!req.userId || !OTP) {
    return res.json({ success: false, message: "Missing Field" });
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOTP !== OTP) {
      return res.json({ success: false, message: "OTP not matched" });
    }

    if (user.verifyOTPExpireAT < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerify = true;
    user.verifyOTP = "";
    user.verifyOTPExpireAT = 0;

    await user.save();

    return res.json({ success: true, message: "Account verified" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


export const getMe = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.json({ loggedIn: false });
    }

    return res.json({
      loggedIn: true,
      user: decoded
    });

  } catch (error) {
    return res.json({ loggedIn: false });
  }
};
export const wishList = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const { productId } = req.body;

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const exist = user.wishlist.some(
      (id) => id.toString() === productId.toString()
    );

    if (exist) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId.toString()
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      success: true,
      wishListed: !exist,
      wishlist: user.wishlist
    });
  } catch (error) {
    next(error);
  }
};

export const getWishList = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      wishlist: user.wishlist
    });
  } catch (error) {
    next(error);
  }
};

