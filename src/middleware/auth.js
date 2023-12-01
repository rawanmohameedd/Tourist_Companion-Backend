const jwt = require('jsonwebtoken');
const User= require('../models/Tourist')

const auth= async (req,res)=>{

    try{
        
        const token= req.header('Authorization').replace('Bearer','');
        const decoded= jwt.verify(token,'yarab');
        const user= await User.getByUsername(decoded.tourguide_username)
        if(!user) throw new Error()
        req.user=user
        req.token=token

    } catch (error){
        res.status(401).send({error :"user not authorized"})
    }
}
module.exports= auth