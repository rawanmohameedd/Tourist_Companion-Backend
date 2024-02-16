const express = require ('express')
const Router = new express.Router()

const searchServices = require("../Services/FindAGuide")

Router.get("/username/:user", async(req,res)=>{
    try{
        const user = req.params.user.toLowerCase()
        const result = await searchServices.searchByUsername(user)
        if (result.tourGuides.length) {
            console.log("Search result:", result);
            return res.send(result);
        }
        return res.status(400).send({
            message: "There are no matching users."
        });
    }catch(error){
        console.error("Error fetching Search request:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})


Router.get("/spoken_lang/:user", async(req,res)=>{
    try{
        const user = req.params.user
        const result = await searchServices.searchBySpokenlang(user)
        if (result.tourGuides.length) {
            console.log("Search result:", result);
            return res.send(result);
        }
        return res.status(400).send({
            message: "There are no matching users."
        });
    }catch(error){
        console.error("Error fetching Search request:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})
module.exports = Router