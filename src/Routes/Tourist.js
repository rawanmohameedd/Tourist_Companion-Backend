const express = require("express")
const Router = new express.Router()
const touristServices = require('../Services/Tourist')
const auth = require("../middleware/auth")
const upload = require("../Utils/multerSetup")
// const FacebookStrategy = require('passport-facebook').Strategy
const Tourist = require('../models/Tourist')
const { generateErrorMessage } = require("../Utils/User")
const axios = require('axios');


const APP_ID = '1128288548204177';
const APP_SECRET = '7e89a8752d0e1c2065a922f223cb2e4a';
const REDIRECT_URI = '<http://192.168.1.103:3000/auth/facebook/callback>';


Router.get('/auth/facebook', (req, res) => {
    console.log("back")
    const url = 'https://www.facebook.com/v13.0/dialog/oauth?' +
        'client_id=1128288548204177' +
        '&redirect_uri=http://localhost:3000/auth/facebook/callback' +
        '&scope=email';
    try {
        res.send(`<script>window.location.href = '${url}';</script>`);
    } catch (error) {
        console.error('Error while redirecting:', error);
        res.status(500).send('Error while redirecting to Facebook authentication');
    }
})


Router.get('/auth/facebook/callback', async (req, res) => {
    console.log("toka")
    const { code } = req.query;
    console.log(req.query)

    try {
        // Exchange authorization code for access token
        const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);

        const { access_token } = data;

        // Use access_token to fetch user profile
        const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);

        // Code to handle user authentication and retrieval using the profile data

        res.redirect('/');
    } catch (error) {
        console.error('Error:', error.response.data.error);
        res.redirect('/signinT');
    }
});

// Logout route
Router.get('/logout', (req, res) => {
    // Code to handle user logout
    res.redirect('/signinT');
});
// const passport = require("passport")
// const session = require('express-session')

// Router.use(session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true
// }));

// // Initialize passport
// Router.use(passport.initialize());
// Router.use(passport.session());

// passport.use(new FacebookStrategy({
//     clientID: '7227441087376855',
//     clientSecret: 'beb952b3509e761a36eeab896954e0cf',
//     callbackURL: 'http://localhost:3000/ProfileT'
// },
//     (accessToken, refreshToken, profile, done) => {
//         console.log(profile)
//         const result = Tourist.createTourist(profile)
//         if (!profile) {
//             return generateErrorMessage(404, "There is no profile in facebook")
//         }
//         return { value: result }
//     }

// ))


// Router.get('/auth/facebook', passport.authenticate('facebook'))

// Router.get('auth/facebook/profileT',
//     passport.authenticate('facebook', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful authentication, redirect to success page
//         res.redirect('/profileT');
//     });






Router.post("/signupT", async (req, res) => {
    const tour_username = req.body.tour_username
    const payload = {
        tour_username: tour_username.toLowerCase(),
        emailT: req.body.emailT.toLowerCase(),
        first_nameT: req.body.first_nameT,
        last_nameT: req.body.last_nameT,
        nationalityT: req.body.nationalityT,
        birthdayT: req.body.birthdayT,
        passwordT: req.body.passwordT,
    };
    const result = await touristServices.SignupT(payload)
    if (result.value) {
        return res.send(result)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})

Router.post("/signinT", async (req, res) => {
    const payload = {
        emailT: req.body.emailT.toLowerCase(),
        passwordT: req.body.passwordT,
    };
    const result = await touristServices.signinT(payload);

    if (result.value) {
        console.log(result)
        return res.send(result);
    }
    res.status(result.statusCode).send({
        message: result.message,
    });
})

Router.get("/ProfileT", auth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).send({ message: "Profile not found" });
        }
        return res.send(req.user)
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

Router.put("/uploadT", auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const url = req.file.path;
        const result = await touristServices.uploadPhoto(url, req.user.tour_username);

        if (result.value) {
            return res.status(200).json({ message: "File uploaded successfully" });
        } else {
            return res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = Router