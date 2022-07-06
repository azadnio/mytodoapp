const express = require('express')
    , router = express.Router()
    , Speakeasy = require("speakeasy");

const testEmail = 'azadnio@gmail.com'
    , testPassword = 'azad12345';


router
    // get all the tasks
    .post('/login', (req, res) => { 

        let { email, password } = req.body;

        let status = false;

        if(email == testEmail && password === testPassword) {

            status = true;
            var secret = Speakeasy.generateSecret({ length: 20 });
            res.send({ "secret": secret.base32, status });
        }

        //invalid email and password
        else
            res.status(401).json({status, message: 'Invalid username or password'})
    })
    
    // create a new task
    .post("/generate-otp", (request, response, next) => {
        response.send({
            "token": Speakeasy.totp({
                secret: request.body.secret,
                encoding: "base32"
            }),
            "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
        });
    })

    //update a task
    .post("/validate-otp", (request, response, next) => {
        response.send({
            "valid": Speakeasy.totp.verify({
                secret: request.body.secret,
                encoding: "base32",
                token: request.body.token,
                window: 0
            })
        });
    });

module.exports = router;