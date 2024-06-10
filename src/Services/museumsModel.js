const MuseumModel = require("../Models/museumsModel")

async function update (musid){
    try{
        const status = await MuseumModel.updateStatus(musid)
        if (status){
            return {value : status}
        }
        return { error :" No museum found"}
    }catch (error){
        return {error: "Failed to change museum status"}
    }
}

async function addRooms ({room_name , avg_capcity, full_capcity, musid}){
    try{
        const status = await MuseumModel.viewStatus(musid)
        console.log(status,"toot")
        if(status){
            const rooms = await MuseumModel.addRooms({room_name , avg_capcity, full_capcity, musid})
            console.log(rooms)
            if(rooms){
                return {value: rooms}
            }
            return { error: "error during adding rooms"}
        }
        return { error: "This museum has't been enabled yet"}
    } catch (error){
        return {error : "Failed to insert rooms to this museum"}
    }
}
module.exports={
    update, 
    addRooms
}