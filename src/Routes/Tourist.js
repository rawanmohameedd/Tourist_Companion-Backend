const express = require("express")
const Router = new express.Router()

const touristServices = require('../Services/Tourist')
const auth = require("../middleware/auth")

Router.post("/signupT", async (req, res) => {
    const payload = {
        tour_username: req.body.tour_username,
        emailT: req.body.emailT,
        first_nameT: req.body.first_nameT,
        last_nameT: req.body.last_nameT,
        nationalityT: req.body.nationalityT,
        birthdayT: req.body.birthdayT,
        passwordT: req.body.passwordT,
    };
    const result = await touristServices.SignupT(payload)
    if (result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})

Router.post("/signinT", async (req, res) => {
    const payload = {
        emailT: req.body.emailT,
        passwordT: req.body.passwordT,
    };
    const result = await touristServices.signinT(payload);

    if (result.value) {
        return res.send(result.value);
    }
    res.status(result.statusCode).send({
        message: result.message,
    });
})

Router.get("/profileT", auth, async (req, res) => {
    try {
        return res.send(req.user)
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

module.exports = Router