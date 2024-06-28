const indoorModels = require('../Models/indoorMangment')

async function add ({username , role, museum_name,location}){
    try{
        const exist = await indoorModels.getbyUsername(username)
        if (exist){
            const updateUser = await indoorModels.updateuser({username,museum_name,location})
            if (updateUser)
                return updateUser
        } else{
            const newuser = await indoorModels.adduser({username , role, museum_name,location})
        
            if(newuser){
                return newuser
            }
        }
        
        return {error : 'Check what is wrong in services add user'}

    } catch (error){
        console.error('Error in add function:', error); 
        return {error : 'Failed to add this username location'}
    }
}

async function update ({username , museum_name, location}){
    try{
        const updateduser = indoorModels.updateuser({username, museum_name, location})

        if (updateduser){
            return updateduser
        }
        return {error : 'Check what is wrong in services update user'}

    } catch (error){
        return {error : 'Failed to update this username location'}
    }
}

async function deletation (username){
    try{
        const deleting = await indoorModels.deleteuser(username)
        if(deleting){
            return deleting
        }
        return {error : 'Check what is wrong in services delete user'}

    } catch (error){
        return {error : 'Failed to delete this username location'}
    }
}

async function crowd ({museum_name,location}){
    try{
        const users = await indoorModels.crowdRooms({museum_name,location})
        
            return users
        
    } catch (error){
        return {error : "Couldn't see users in this room"}
    }
}
module.exports = {
    add ,
    update,
    deletation,
    crowd
}