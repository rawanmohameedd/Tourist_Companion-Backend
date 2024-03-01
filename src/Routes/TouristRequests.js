const express = require ("express")
const Router = new express.Router()

const RequestServices = require("../Services/TouristRequests")

Router.post("/sentRequest", async (req, res) => {
    try {
        const { tour_username, tourguide_username, is_one_visit, visit_date, place, start_date, duration } = req.body;

        if (is_one_visit) {
            if (!visit_date || !place) {
                return res.status(400).json({ error: "Visit date and place cannot be empty for one-time visit." });
            }
        } else {
            if (!start_date || !duration) {
                return res.status(400).json({ error: "Start date and duration cannot be empty for multiple visits." });
            }
        }

        const request = is_one_visit ? { tour_username, tourguide_username,is_one_visit, visit_date, place } : { tour_username, tourguide_username,is_one_visit, start_date, duration };

        const Request = await RequestServices.sent(request);

        if (Request) {
            return res.status(200).json({ value: Request });
        } else {
            return res.status(400).json({ error: "Internal Models Error" });
        }
    } catch (error) {
        console.error("Error handling request:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

Router.get("/showRequests/:tourguide_username", async(req, res)=>{
    try {
        const tourguide_username = req.params.tourguide_username
        const showRequest = await RequestServices.show(tourguide_username)
        if (showRequest){
            return  res.status(200).json({ value: showRequest });
        } else {
            return res.status(400).json({ error: "Internal Models Error" });
        }   
    } catch (error){
        console.error("Error handling request:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

Router.delete("/declinedRequest/:tour_username", async (req, res) => {
    try {
        const tour_username = req.params.tour_username;
        const declined = await RequestServices.decline(tour_username);

        if (declined) {
            return res.status(200).json({ message: "Request declined successfully." });
        } else if (!declined) {
            return res.status(404).json({ error: "No request found with the provided tour_username." });
        } 
        return res.status(500).json({ error: "Internal server error occurred while declining the request." }); 
    } catch (error) {
        console.error("Error handling request:", error.message);
        return res.status(500).json({ error: "Internal server error occurred." });
    }
});

module.exports = Router