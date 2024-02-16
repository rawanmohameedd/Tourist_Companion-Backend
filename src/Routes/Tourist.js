const express = require("express")
const Router = new express.Router()
const touristServices = require('../Services/Tourist')
const auth = require("../middleware/auth")
const upload = require("../Utils/multerSetup")



Router.post("/signupT", async (req, res) => {
    const tour_username= req.body.tour_username
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