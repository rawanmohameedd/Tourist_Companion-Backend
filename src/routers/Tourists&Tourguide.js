const express = require("express")
const UserT = require("../models/Tourist");
const UserTG = require("../models/Tourguide")
const router = new express.Router();
const auth = require('../middleware/auth')

router.post("/signupTourist", async (req, res) => {
  const user = req.body;
  const existingusername = await UserT.getByUsernameT(user.tour_username) || await UserTG.getByUsernameTG(user.tourguide_username);
  const existingEmail = await UserT.getByEmailT(user.emailT) || await UserTG.getByEmailTG(user.emailTG)

  if (existingusername || existingEmail) {
    return res.status(400).send({ message: "Email  or username is already in use" });
  }
  if(!user.tour_username ||!user.emailT||!user.first_nameT||!user.last_nameT||!user.nationalityT||!user.birthdayT||!user.passwordT){
    return res.send({ message: "One or More Fields are Empty" });
  }
  await UserT.createTourist(user);
  res.send({
    message: "Done"
  });
});

router.post("/signupTourGuide", async (req, res) => {
  const user = req.body;
  const existingusername = await UserT.getByUsernameT(user.tour_username) || await UserTG.getByUsernameTG(user.tourguide_username);
  const existingEmail = await UserT.getByEmailT(user.emailT) || await UserTG.getByEmailTG(user.emailTG)

  if (existingusername || existingEmail) {
    return res.status(400).send({ message: "Email  or mobile is already in use" });
  }
  if(!user.tourguide_username ||!user.emailTG||!user.first_nameTG||!user.last_nameTG||!user.nationalidTG||!user.birthdayTG||!user.spoken_langTG||!user.passwordTG){
    return res.send({ message: "One or More Fields are Empty" });
  }
  await UserTG.createTourGuide(user);
  res.send({
    message: "Done"
  });
});

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body)
  const user1 = await UserT.signinTour(email, password) || await UserTG.signinTourGuide(email, password);
  if (user1) {
    res.status(200).send(user1);
  } else {
    res.status(400).send({ 

      message: "email or Password Incorrect"
    });
  }
});


module.exports = router;