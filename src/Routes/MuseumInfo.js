const express = require("express")
const Router = new express.Router()
const auth = require('../middleware/auth')
const upload = require ('../Utils/multerSetup')

const museumModels = require("../Models/MuseumInfo")
const museumServices = require("../Services/MuseumInfo")

Router.get ("/museums", async (req,res)=>{
    try{
        const all = await museumServices.allMuseums()
        console.log(all)
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

Router.get("/searchMuseum/:name", async(req,res)=>{
    try{
        const name = req.params.name
        console.log(name)
        const result = await museumServices.search(name)
        if (result.museums.length) {
            console.log("Search result:", result);
            return res.send(result);
        }

        return res.status(400).send({
            message: "There are no matching museums."
        });
    }catch(error){
        console.error("Error fetching Search request:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})

Router.post ("/addMuseum" , async (req,res)=>{
    
    const payload ={
        museum_name: req.body.museum_name ,
        ticket_tourist: req.body.ticket_tourist ,
        ticket_adult: req.body.ticket_adult ,
        ticket_student: req.body.ticket_student , 
        museinfo: req.body.museinfo ,
    }

    console.log("first",payload)
    const result = await museumServices.addMuseum(payload)
    if (result){
        return res.send(result)
    }
    
})

Router.put("/updateMap/:museum_name", upload.single('image') ,async(req,res)=>{
    try{
        const museum_name = req.params.museum_name
        if (!req.file) {
            return res.send("not file uploaded")
        }
        const url = req.file.path
        const result = await museumServices.updateMap({url, museum_name})
        if (result== true) {
            return res.send("file uploaded sucessfully")
        }
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})

Router.put("/updateImage/:museum_name", upload.single('image') ,async(req,res)=>{
    try{
        const museum_name = req.params.museum_name
        if (!req.file) {
            return res.send("not file uploaded")
        }
        const url = req.file.path
        const result = await museumServices.updateImage({url, museum_name})
        console.log(result)
        if (result == true) {
            return res.send("file uploaded sucessfully")
        }
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})

Router.put("/editMuseum/:museum_name",  async(req,res) =>{
    try {
        const payload = {
            museum_name: req.params.museum_name,
            ticket_tourist: req.body.ticket_tourist,
            ticket_adult: req.body.ticket_adult,
            ticket_student: req.body.ticket_student,
            museinfo: req.body.museinfo,
        }

        const result = await museumServices.edit(payload)

        if(result){
            console.log(result)
            res.send(result)
        }
    } catch (error){
        console.error("Error updating museums: ", error.message)
        res.status(500).send({ message: "Internal Server Error" });
    }
})

Router.delete("/deleteMuseum/:museum_name", async (req, res) => {
    try {
        const museum_name = req.params.museum_name;
        const result = await museumModels.deleteMuseum(museum_name);

        if (result.success) {
            return res.send({ message: "Museum deleted successfully" });
        } else {
            return res.status(400).send({ message: "Failed to delete museum" });
        }
    } catch (error) {
        console.error("Error deleting museum:", error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports= Router