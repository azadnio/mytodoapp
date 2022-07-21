const express = require('express')
    , router = express.Router()
    , speakeasy = require("speakeasy")
    , qrCode = require("qrcode");

const testEmail = 'azadnio@gmail.com'
    , testPassword = 'azad12345';


router
    // get the logon credentials and create security token
    .post('/login', (req, res) => { 

        let { email, password } = req.body;

        let status = false;

        if(email == testEmail && password === testPassword) {

            status = true;
            var secret = speakeasy.generateSecret({ length: 20 });

            qrCode.toDataURL(secret.otpauth_url, (err, data) => {

                if (err)
                    return res.status(400).json({status, message: "An error occured Please try again later."});

                res.send({status, img: data, secret: secret.ascii});
            });

        }

        //invalid email and password
        else
            res.status(401).json({status, message: 'Invalid username or password'})
    })
    

    //Validate the OTP number
    .post("/validate-otp", (request, response, next) => {

        let isValidOTP = speakeasy.totp.verify({
            secret: request.body.secret,
            encoding: "ascii",
            token: request.body.token
        });

        let statusCode  = isValidOTP ? 200 : 401;
        let message     = isValidOTP ? "OTP validated!" : "Invalid or expired OTP number";

        response.status(statusCode).send({
            "valid": isValidOTP,
            "message": message
        });
    });

module.exports = router;