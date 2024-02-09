const express = require("express")
const Router = new express.Router()
const tourguideServices = require('../Services/Tourguide')
const auth = require('../middleware/auth')
const upload = require("../Utils/multerSetup")

Router.post("/signupTG", async (req, res) => {
    const payload = {
        tourguide_username: req.body.tourguide_username,
        emailTG: req.body.emailTG,
        first_nameTG: req.body.first_nameTG,
        last_nameTG: req.body.last_nameTG,
        nationalidTG: req.body.nationalidTG,
        birthdayTG: req.body.birthdayTG,
        spoken_langTG: req.body.spoken_langTG,
        passwordTG: req.body.passwordTG,
    };
    const result = await tourguideServices.SignupTG(payload)
    if (result.value) {
        return res.send(result)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})

Router.post("/signinTG", async (req, res) => {
    const payload = {
        emailTG: req.body.emailTG,
        passwordTG: req.body.passwordTG,
    };
    const result = await tourguideServices.SigninTG(payload);

    if (result.value) {
        console.log(result)
        return res.send(result);
    }
    res.status(result.statusCode).send({
        message: result.message,
    });
})

Router.get("/ProfileTG", auth, async (req, res) => {
    try {
        return res.send(req.user)
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

Router.put("/uploadTG", auth, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.send("not file uploaded")
    }
    const url = req.file.path
    const result = await tourguideServices.uploadPhoto(url, req.user.tourguide_username)
    if (result.value) {
        return res.send("file uploaded sucessfully")

    }
    res.status(400).send({
        message: result.message,
    });
})

module.exports = Router