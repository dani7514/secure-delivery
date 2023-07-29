const userModel = require("../models/User");
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const seedUserData = require("../seedData/users");

exports.seedUsers = async (req, res) => {
    const userCount = await userModel.countDocuments();
    if (userCount > 0) {
        res.send("Seed is already done!");
        return;
    }
    await userModel.create(seedUserData.users);
    res.send("Seed is done!");
};

exports.registerUser = async (req, res) => {
    try {
        const newUser = req.body;
        console.log('newUser', newUser);
        const user = await userModel.findOne({email: newUser.email});
        if (user) {
            res.status(400).send('User is already exist, please login!');
            return;
        }
        newUser.password = await bcrypt.hash(newUser.password, 10);
        newUser.isAdmin = false;
        console.log("final", newUser)
        const dbUser = await userModel.create(newUser);
        res.send(generateTokenResponse(dbUser));

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.loginUser = asyncHandler(async (req, res) => {
    try {
        console.log('user', "this is the user thing");
        const {email, password} = req.body;
        let user = await userModel.findOne({email});

        const secret = speakeasy.generateSecret();

        const otp = speakeasy.totp({
            secret: secret.base32, digits: 6, step: 30,
        });// Generate the OTP

        user.otp = otp;
        await user.save();

        await sendEmailWithOTP(email, otp);


        const decryptedPassword = await bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result) {
                console.log('result', result);
                res.json({"result": "correct password"})
            } else {
                console.log('err password not correct');
                res.status(400).send("credentials is not valid");
            }
            // console.log('err',err);
            // console.log('result',result);
        })

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    try {
        const otp = req.body.otp;
        const email = req.body.email;
        let user = await userModel.findOne({email});
        if (user.otp == otp) {
            console.log('otp', otp);
            res.json(generateTokenResponse(user.toObject()))
        } else {
            res.status(400).send("OTP is not valid");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});

exports.storeCartData = asyncHandler(async (req, res) => {
    const response = await userModel.findOneAndUpdate({_id: req.params.id}, {$set: {cart: req.body}}, {new: true})
    console.log(response.items);
    res.send(response);
});

exports.getCartData = asyncHandler(async (req, res) => {
    const email = req.body.email;
    let userCart = await userModel.findOne({email});
    res.json(userCart.cart);
});

exports.getProfile = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({message: 'Authorization token is missing'});
    }
    try {
        console.log('token backend recieved', token);
        const decoded = jwt.verify(token, "leulabayejigu");
        const userId = decoded.id;
        console.log('userId', userId);
        const userProfile = await userModel.findOne({_id: userId})

        res.json(userProfile);
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: 'Invalid token'});
    }
});

// Function to send the email with OTP
async function sendEmailWithOTP(email, otp) {
    try {
        // Create a Nodemailer transporter

        let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            // Configure the email service provider
            service: 'gmail', host: 'smtp.gmail.com', // Replace with your email service provider
            auth: {
                user: 'Leulabay4@gmail.com', // Replace with your email address
                pass: 'imeoumcjwlyuylyz', // Replace with your email password
            },
        });

        // Send the email
        const info = await transporter.sendMail({
            from: 'leulabay4@gmail.com', // Replace with your email address
            to: email, // Recipient's email address
            subject: 'One-Time Password (OTP)', text: `Your OTP: ${otp}`,
        });

        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


// generate login token
const generateTokenResponse = (user) => {
    payload = {
        id: user.id, email: user.email, isAdmin: user.isAdmin
    }
    user.token = jwt.sign(payload, "leulabayejigu", {expiresIn: "200s"});
    return user;
}

exports.generateTokenResponse = generateTokenResponse;
exports.sendEmailWithOTP = sendEmailWithOTP;
