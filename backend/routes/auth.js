const express = require("express");
const router = express.Router();
const crypto = require('crypto')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user.model");

router.route('/login').post(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
})

router.route('/register').post(async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
})

router.route('/googleLogin').post(async (req, res) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID
        });
        const { name, email, email_verified } = ticket.getPayload();

        if (email_verified) {
            const user = await User.findOne({ email })
            if (!user) {
                let password = crypto.randomBytes(20).toString('hex');
                const userNew = await User.create({
                    username: name,
                    email,
                    password
                });
                sendToken(userNew, 200, res)
            } else {
                sendToken(user, 200, res);
            }
        } else {
            res.json(new ErrorResponse("Invalid credentials", 401))
        }
    } catch (err) {
        console.log("ERROR " + err)
    }

})

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};

module.exports = router;