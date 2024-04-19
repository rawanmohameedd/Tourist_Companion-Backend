const express = require ("express")
const Router = new express.Router()

const RequestServices = require("../Services/TouristRequests")

Router.post("/sentRequest", async (req, res) => {
    try {
        const { tour_username, tourguide_username, is_one_visit, visit_date, place, start_date, end_date } = req.body;

        if (is_one_visit) {
            if (!visit_date || !place) {
                return res.status(400).json({ error: "Visit date and place cannot be empty for one-time visit." });
            }
        } else {
            if (!start_date || !end_date) {
                return res.status(400).json({ error: "Start date and duration cannot be empty for multiple visits." });
            }
        }

        const request = is_one_visit ? { tour_username, tourguide_username,is_one_visit, visit_date, place } : { tour_username, tourguide_username,is_one_visit, start_date, end_date };

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

Router.get('/getTourists/:tourguide', async(req,res)=>{
    try{
        const tourguide_username = req.params.tourguide
        console.log('routes', tourguide_username)
        const tourists = await RequestServices.Tourist(tourguide_username)
        if (tourists) {
            return  res.status(200).json({ value: tourists });
        }
        return {message: "NO Connected tourists yet"}
    } catch(error){
        console.error("error handling this request", error)
        return res.status(500).json({error: "internal server error"})
    }
})

Router.get("/getTourguide/:tourist", async(req,res)=>{
    try{
    const tour_username = await req.params.tourist
    console.log(tour_username)
    const connectedTourguide = await RequestServices.Tourguide(tour_username)
    console.log('first', connectedTourguide)
    if (connectedTourguide) {
        return  res.status(200).json({ value: connectedTourguide });

    } 
        return res.status(404).json({ error: "No tourguide is being vonnect to this tourist." })
    } catch (error){
        console.error("Error handling request:", error.message);
        return res.status(500).json({ error: "Internal server error occurred." });
    }
})

module.exports = Router