const express = require("express")
const Router = new express.Router()
const TG = require('../Services/Tourguide')
const auth = require('../middleware/auth')

Router.post("/signupTG", async(req,res)=>{
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
    const created= await TG.SignupTG(payload)
    console.log(created)
    if(created){
        return res.send(created)
    }
})

Router.post("/signinTG", async(req,res)=>{
    const payload = {
        emailTG: req.body.emailTG,
        passwordTG: req.body.passwordTG,
    };
    const result = await TG.SigninTG(payload);
    
    if (result) {
        return res.send(result);
    }
    res.status(result.statusCode).send({
        message: result.message,
    });
})

Router.get("/getProfileTG", auth, async (req, res) => {
    try {
        return res.send(req.user)
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

module.exports=Router