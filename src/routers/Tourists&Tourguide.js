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

router.post('/signin', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log(req.body);

    // Try to sign in as a tourist
    const userTourist = await UserT.signinTour(email, password);
    if (userTourist) {
      return res.status(200).json(userTourist);
    }

    // Try to sign in as a tour guide
    const userTourguide = await UserTG.signinTourGuide(email, password);
    if (userTourguide) {
      return res.status(200).json(userTourguide);
    }

    // If no user found, return error
    res.status(400).json({ message: 'Email or password incorrect' });
  } catch (error) {
    console.error('Error in /signin route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;