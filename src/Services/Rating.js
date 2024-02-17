const Rating = require('../Models/Rating')
const Utils = require('../Utils/User')

async function GivingArate({tourguide_username, tour_username, rate, visit, date_of_the_visit}){
    if ( !rate || !visit || !date_of_the_visit){
        return Utils.generateErrorMessage(400, "Missing Required Fields");
    }
    const singleRate = await Rating.giveArate({tourguide_username, tour_username, rate, visit, date_of_the_visit})
    if (!singleRate){
        return Utils.generateErrorMessage(400, "Internel Server Error")
    }
    return {
        singleRate
    }
}

async function ShowAllRates(tourguide_username){
    try{
        console.log('ana services',tourguide_username)
        const allRates = await Rating.showRates(tourguide_username)
        console.log(allRates)
        if (allRates){
            return { allRates }
        }
        return { error: "This tourguide has no rates yet"}
    }catch(error){
        return { error: "Failed to get to this rate table"}
    }
}

async function ShowTouristVisits(tour_username){
    try{
        const visits = await Rating.touristVisits(tour_username)
        if (visits){
            return {visits}
        }
        return { error : "This tourist hasn't visited any place yet"}
    } catch(error){
        return { error: "failed to get this tourist visits"}
    }
}

module.exports={
    GivingArate,
    ShowAllRates,
    ShowTouristVisits
}