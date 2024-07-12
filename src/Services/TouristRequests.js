const requestModels = require("../Models/TouristRequests")
const utils = require ("../Utils/User")

async function sent(request) {
    try {
        if (request.is_one_visit) {
            if (!request.visit_date || !request.place) {
                return utils.generateErrorMessage(400, "Visit date and place cannot be empty for one-time visit.");
            }
        } else {
            if (!request.start_date || !request.end_date) {
                return utils.generateErrorMessage(400, "Start and end date cannot be empty for multiple visits.");
            }
        }
        const Request = await requestModels.sendRequest(request); 
        if (Request) {
            console.log(request)
            return Request;
        }
        return utils.generateErrorMessage(400, "Internal Models Error");
    } catch (error) {
        console.error("Error processing request:", error.message);
        throw error; 
    }
}

async function show (tourguide_username){
    try {
        const showRequests = await requestModels.showAllRequests(tourguide_username)
        console.log(showRequests)
        if (showRequests){
            return {showRequests}
        }
        return {error : "No connected tourists"}
    } catch (error){
        return {error: "failed to show this tourguide connections"}
    }

}

async function decline (tour_username){
    try {
        const declined= await requestModels.declineRequest(tour_username)
        console.log(declined)
        return declined
    } catch (error){
        return { error: "can't decline this tourist"}
    }
}

async function Tourist(tourguide_username){
        try{
            console.log('services', tourguide_username)
            const tourist= await requestModels.connectedTourist(tourguide_username)
            console.log('hena services',tourist)
            if (tourist)
            return tourist
        return {message : "This tourguide has no connected tourists yet"}
        } catch(error){
            return { error: "can't get which tourists this tour guide is connected to"}
        }
}

async function Tourguide(tour_username){
    try{
        const tourguide= await requestModels.connectedTourguide(tour_username)
        return tourguide
    } catch(error){
        console.error("Error getting tour guide:", error);
        return { error: "Unable to retrieve connected tour guide" };     }
}

async function accept (tour_username){
    try{
        const accepted = await requestModels.acceptRequest(tour_username)
        console.log(accepted)
        if(accepted)
            return accepted
        return "msh tal3a true"
    }catch(error){
        console.error("Error aacepting user:", error);
        return { error: "Unable to retrieve this tourist request" }; 
    }
}

module.exports = {
    sent,
    show,
    accept,
    decline,
    Tourguide,
    Tourist
}