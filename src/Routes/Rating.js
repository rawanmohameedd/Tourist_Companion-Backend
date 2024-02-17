const express = require ("express")
const Router = new express.Router()
const rateServices = require('../Services/Rating')

Router.post("/singleRate", async (req,res)=>{
    const payload = {
        tour_username: req.body.tour_username,
        tourguide_username: req.body.tourguide_username,
        rate: req.body.rate,
        visit: req.body.visit,
        date_of_the_visit: req.body.date_of_the_visit,
    }

    const result = await rateServices.GivingArate(payload)

    if(result){
        return res.send(result)
    }

    res.status(result.statusCode).send({
        message: result.message
    })
})

Router.get("/showAllRates/:tourguide_username", async(req,res)=>{
    try{
        const tourguide_username = req.params.tourguide_username
        const allRates = await rateServices.ShowAllRates(tourguide_username)

        console.log(allRates)
        if (allRates){
            return res.send(allRates)
        }
        return res.status(400).send({
            message:"There is no rates for this tourguide"
        })
    }catch(error){
        console.error("Error fetching rating table:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
})

Router.get("/touristVisits/:tour_username", async (req,res)=>{
    try{
        const tour_username = req.params.tour_username
        const visits = await rateServices.ShowTouristVisits(tour_username)
        if (visits){
            return res.send(visits)
        }
        return { error : " This tourist hasn't made any visits"}
    } catch(error){
        console.error("Error fetching tourist visits:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
})
module.exports = Router