const jwt = require('jsonwebtoken');
const User= require('../models/Tourguide')

const auth= async (req,res,next)=>{

    try{
        
        const token= req.header('Authorization').replace('Bearer ','');
        const decoded= jwt.verify(token,'yarab');
        const user= await User.getProfileData(decoded.tourguide_username)
        if(!user) throw new Error()
        req.user=user
        req.token=token
        next();

    } catch (error){
        res.status(401).send({error :"user not authorized"})
    }
}
module.exports= auth