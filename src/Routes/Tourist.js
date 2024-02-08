const express = require("express")
const Router = new express.Router()
const touristServices = require('../Services/Tourist')
const auth = require("../middleware/auth")
const upload = require("../Utils/multerSetup")



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
        console.log(result)
        return res.send(result);
    }
    res.status(result.statusCode).send({
        message: result.message,
    });
})

Router.get("/ProfileT", auth, async (req, res) => {
    try {
        return res.send(req.user)
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

Router.put("/uploadT", auth, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.send("not file uploaded")
    }
    const url = req.file.path
    const result = await touristServices.uploadPhoto(url, req.user.tour_username)
    if (result.value) {
        return res.send("file uploaded sucessfully")

    }
    res.status(400).send({
        message: result.message,
    });
})

module.exports = Router