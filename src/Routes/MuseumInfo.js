const express = require("express")
const Router = new express.Router()

const museumServices = require("../Services/MuseumInfo")

Router.get ("/museums", async (req,res)=>{
    try{
        const all = await museumServices.allMuseums()
        if(all.value){
            return res.send(all.value)
        }
        return res.status(400).send({
            message: "No museums here"
        })

    } catch (error){
        console.error("Error fetching museums:", error.message);
        res.status(400).send({
            message: "Internal Server Error"
        });
    }
})

Router.get("/museum/:musid", async(req,res)=>{
    try{
        const musid = req.params.musid
        const one = await museumServices.oneMuseum(musid)
        if (one){
            return res.send(one)
        }
        return res.status(400).send({
            message:"There is no museum with this id"
        })
    } catch (error){
        console.error("Error fetching museum:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})
module.exports= Router