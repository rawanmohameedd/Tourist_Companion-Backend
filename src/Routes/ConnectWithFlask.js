const express = require("express")
const Router = new express.Router()
const axios = require("axios")

const modelInfo = require("../Models/ConnectWithFlask")

Router.post('/ConnectWithFlask', async (req, res) => {
    const { readings } = req.body;
    if (!readings) {
        console.error('Invalid or empty data received:', readings);
        return res.status(400).send('Invalid data received.');
    }
    console.log('abl ma el request ytba3t ll models ',readings)
    try{
        const result= await axios.post('http://127.0.0.1:5000/predict',readings)
        console.log("Flask respone ",result.data)
        res.send(result.data)
    }catch(error){
        console.error('Error sending data to Flask server:', error);
        res.status(500).send('Internal server error.');
    }
    });

Router.get ('/getBssid/:museumname', async(req,res)=>{
    try{
        const museum_name = req.params.museumname
        const bssids = await modelInfo.getBssids(museum_name)
        if(bssids){
            return res.send(bssids)
        }
        return res.status(400).send({
            message: "There are no bssids for this museum."
        });
    } catch(error){
        console.error("Error fetching Search request:", error.message);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})
module.exports= Router