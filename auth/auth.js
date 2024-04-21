const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

// Middleware function to handle user login
exports.login = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    userModel.lookup(username, function (err, user) {
        if (err) {
            console.log("Error looking up user", err);
            return res.status(401).send();
        }
        if (!user) {
            console.log("User", username, "not found");
            return res.render("user/register");
        }

        // Compare provided password with stored password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                // Use the payload to store information about the user such as username.
                let payload = { username: user.username };
                // Create the access token
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
                res.cookie("jwt", accessToken);
                next();
            } else {
                return res.render("user/login");
                
            }
        });
    });
};

// middleware function to verify the access token stored in the user's cookie
exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;

    if (!accessToken) {
        return res.status(403).send();
    }

    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        // If an error occurred, return request unauthorized error
        res.status(401).send();
    }
};



