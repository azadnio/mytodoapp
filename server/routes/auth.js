const express = require('express')
    , router = express.Router()
    , speakeasy = require("speakeasy");

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
            res.send({ "secret": secret.base32, status });
        }

        //invalid email and password
        else
            res.status(401).json({status, message: 'Invalid username or password'})
    })
    
    // generate the OTP number
    .post("/generate-otp", (request, response, next) => {


        response.send({
            "token": speakeasy.totp({
                secret: request.body.secret,
                encoding: "base32"
            })
        });
    })

    //Validate the OTP number
    .post("/validate-otp", (request, response, next) => {

        let isValidOTP = speakeasy.totp.verify({
            secret: request.body.secret,
            encoding: "base32",
            token: request.body.token,
            window: 0
        });

        let statusCode  = isValidOTP ? 200 : 401;
        let message     = isValidOTP ? "OTP validated!" : "Invalid or expired OTP number";

        response.status(statusCode).send({
            "valid": isValidOTP,
            "message": message
        });
    });

module.exports = router;