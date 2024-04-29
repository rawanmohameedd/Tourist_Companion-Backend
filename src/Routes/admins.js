const express = require("express")
const Router = new express.Router()
const adminServices = require('../Services/Admins')

Router.post("/login", async (req, res) => {
    const payload = {
        id: req.body.id,
        password: req.body.password,
    };
    const result = await adminServices.loginServices(payload);

    if (result.value) {
        console.log(result)
        return res.send(result);
    }
    res.status(result.statusCode).send({
        message: result.message,
    });
})

module.exports = Router