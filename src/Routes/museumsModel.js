const express = require ("express")
const Router = new express.Router()

const museumModelServices = require("../Services/museumsModel")

Router.put("/changeStatus/:musid", async (req,res)=>{
    try{
        const musid = req.params.musid
        console.log(musid)
        const updateStatus = await museumModelServices.update(musid)
        if (updateStatus){
            console.log("routes", updateStatus)
            return res.send (updateStatus)
        }
        return {error: "Can't update this museum status"}
    }catch(error){
        return { error:"Internal Routes Error"}
    }
})

Router.post("/addRooms",async(req,res)=>{
    try{
        const payload = {
            room_name: req.body.room_name ,
            avg_capcity: req.body.avg_capcity, 
            full_capcity: req.body.full_capcity, 
            musid: req.body.musid
        }
        const room = await museumModelServices.addRooms(payload)
        if (room){
            return res.send(room)
        }
        return {error:"Couldn't add rooms to this museum"}
    } catch (error){
        return { error: "Internal Routes Error"}
    }
})

module.exports= Router