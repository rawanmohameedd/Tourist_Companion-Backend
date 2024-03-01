const requestModels = require("../Models/TouristRequests")
const utils = require ("../Utils/User")

async function sent(request) {
    try {
        if (request.is_one_visit) {
            if (!request.visit_date || !request.place) {
                return utils.generateErrorMessage(400, "Visit date and place cannot be empty for one-time visit.");
            }
        } else {
            if (!request.start_date || !request.duration) {
                return utils.generateErrorMessage(400, "Start date and duration cannot be empty for multiple visits.");
            }
        }
        const Request = await requestModels.sendRequest(request); 
        if (Request) {
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
module.exports = {
    sent,
    show,
    // accept,
    decline
}