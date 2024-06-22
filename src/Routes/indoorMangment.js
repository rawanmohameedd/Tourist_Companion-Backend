const express = require ("express")
const Router = new express.Router()

const indoorServices = require ('../Services/indoorMangment')

Router.post("/newUser", async (req,res)=>{
    const payload = {
        username : req.body.username,
        role : req.body.role,
        museum_name : req.body.museum_name,
        location: req.body.location
    }
    console.log('routes', payload)
    const adding = await indoorServices.add(payload)
    if (adding){
        return res.send(adding)
    }
    return res.status(400).send({message : 'Cant add this user'})
})

Router.put("/updateUser", async (req,res)=>{
    const payload = {
        username : req.body.username,
        museum_name : req.body.museum_name,
        location: req.body.location,
    }
    console.log('routes', payload)
    const updating = await indoorServices.update(payload)
    if (updating){
        return res.send(updating)
    }
    return res.status(400).send({message : 'Cant update this user'})
})

Router.delete("/deleteUser/:username", async(req,res)=>{
    const username = req.params.username

    console.log('routes', username)
    const deleting = await indoorServices.deletation(username)
    if (deleting){
        return res.send({message: "This User is out of the museum"})
    }
    return res.status(400).send({message : 'Cant delete this user'})
})

//Website Routes
module.exports = Router