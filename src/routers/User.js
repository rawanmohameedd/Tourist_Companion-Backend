const express = require("express")
const User = require("../models/User");
const router = new express.Router();
const auth = require('../middleware/auth')

router.get("/users/:id" , async (req, res) => {
  const id = req.params.id;
  const user = await User.getById(id);
  res.send(user);
})

router.post("/signupTourist", async (req, res) => {
  const user = req.body;
  const existingMobile = await User.getByMobile(user.mobile);
  const existingEmail = await User.getByEmail(user.email);

  if (existingMobile || existingEmail) {
    return res.status(400).send({ message: "Email  or mobile is already in use" });
  }
  if(!user.email || !user.fname || !user.lname || !user.mobile || !user.nationality || !user.nationalid || !user.brithday  || !user.password || !user.spoken_lang){
    return res.send({ message: "One or More Fields are Empty" });
  }
  await User.createTourist(user);
  res.send({
    message: "Done"
  });
});

router.post("/signupTourGuide", async (req, res) => {
  const user = req.body;
  const existingMobile = await User.getByMobile(user.mobile);
  const existingEmail = await User.getByEmail(user.email);

 if (existingMobile || existingEmail) {
    return res.status(400).send({ message: "Email  or mobile is already in use" });
  }
  if(!user.email || !user.fname || !user.lname || !user.mobile || !user.nationality || !user.nationalid || !user.brithday  || !user.password || !user.spoken_lang){
    return res.send({ message: "One or More Fields are Empty" });
  }
  await User.createTourGuide(user);
  res.send({
    message: "Done"
  });
});

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.signin(email, password);

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send({ 
      message: "email or Password Incorrect"
    });
  }
});


module.exports = router;
