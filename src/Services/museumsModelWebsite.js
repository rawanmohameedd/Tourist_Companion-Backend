const MuseumModel = require("../Models/museumsModelWebsite")

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

async function view (museum_name){
    try{
        console.log(museum_name,'fel services')
        const selectedMuseum = MuseumModel.viewmuseumUsers(museum_name)
        if (selectedMuseum)
            return selectedMuseum
        return 'There is no people in this museum'
    }catch(error){
        return {error : 'Failed to view museum users right now'}
    }
} 

async function filter ({museum_name, location}){
    try{
        const filteredRoom = MuseumModel.filterUsersbyrooms(museum_name, location)
        if(filteredRoom)
            return filteredRoom
        return 'There is no people in this room'
    }catch(error){
        return {error : 'Failed to see this room users right now'}
    }
}

module.exports={
    update, 
    addRooms,
    view,
    filter
}