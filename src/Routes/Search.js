const express = require ('express')
const Router = new express.Router()

const searchServices = require("../Services/Search")

Router.get("/byUsername/:user", async(req,res)=>{
    try{
        const user = req.params.user.toLowerCase()
        const result = await searchServices.searchByUsername(user)
        if (result.tourists.length || result.tourGuides.length) {
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
Router.get("/byNationality/:nationality", async(req,res)=>{
    try{
        const nationality = req.params.nationality
        console.log(nationality)
        const result = await searchServices.searchByNationality(nationality)
        if (result.tourists.length) {
            console.log("Search result:", result);
            return res.send(result);
        }

        return res.status(400).send({
            message: "There are no matching Tourists."
        });
    }catch(error){
        console.error("Error fetching Search request:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})

module.exports = Router