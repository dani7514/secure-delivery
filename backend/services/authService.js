const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.loginUser = async (email, password) => {
  return await userModel.findOne({ email });
};

exports.generateOTP = async (email) => {
  const secret = speakeasy.generateSecret();
  const otp = speakeasy.totp({
    secret: secret.base32,
    digits: 6,
    step: 30,
  });
  const user = await userModel.findOne({ email });
  user.otp = otp;
  await user.save();
  return otp;
};

exports.sendEmailWithOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "Leulabay4@gmail.com",
        pass: "imeoumcjwlyuylyz",
      },
    });

    const info = await transporter.sendMail({
      from: "leulabay4@gmail.com",
      to: email,
      subject: "One-Time Password (OTP)",
      text: `Your OTP: ${otp}`,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.generateTokenResponse = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  user.token = jwt.sign(payload, "leulabayejigu", { expiresIn: "200s" });
  return user;
};

exports.verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

exports.getUserProfile = async (userId) => {
  return await userModel.findOne({ _id: userId });
};
