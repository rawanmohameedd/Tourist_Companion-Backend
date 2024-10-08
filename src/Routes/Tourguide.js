const express = require("express")
const Router = new express.Router()
const tourguideServices = require('../Services/Tourguide')
const auth = require('../middleware/auth')
const upload = require("../Utils/multerSetup")

Router.post("/signupTG", async (req, res) => {
    const tourguide_username= req.body.tourguide_username
    const payload = { 
        tourguide_username: tourguide_username.toLowerCase(),
        emailTG: req.body.emailTG.toLowerCase(),
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
        emailTG: req.body.emailTG.toLowerCase(),
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

Router.put("/deletePhotoTG", async(req,res)=>{
    const  username  = req.body.tourguide_username;
    console.log('username',username)
    if (!username) {
        console.log(1)
        return res.status(400).json({ error: 'Username is empty' });
    }
    try {
        const deleted = await tourguideServices.deletePhoto(username);
        if (deleted) {
            res.status(200).json({ message: 'Photo deleted successfully' });
        } else {
            res.status(404).json({ error: 'Username not found' });
        }
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

Router.put("/updateAvailability/:tourguide_username", async (req,res)=>{
    try{
        const tourguide_username = req.params.tourguide_username
        const updated = await tourguideServices.available(tourguide_username)
        console.log('routes',updated)
        return res.send(updated)
    }
    catch (error){
        return { error : "can't change available right now"}
    }
})

Router.put("/acceptLicense/:tourguide_username", async (req,res)=>{
    try{
        const tourguide_username = req.params.tourguide_username
        const updated = await tourguideServices.available(tourguide_username)
        console.log('routes',updated)
        return res.send(updated)
    }
    catch (error){
        return { error : "can't change available right now"}
    }
})
module.exports = Router