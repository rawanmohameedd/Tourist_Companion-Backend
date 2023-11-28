const express = require('express')
const Auth=require('../models/Auth')

const router = new express.Router()

router.post('/signin', async (req, res) => { 
    user = {
        email: req.body.email,
        password: req.body.password,
    }
    const response = await Auth.signin(user);
    res.send(response)
})

router.post('/signup', async (req, res) => { 
    user = {
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        job: req.body.nationality,
        mobile: req.body.mobile
    }
    await Auth.signUp(user);
})

module.exports = router