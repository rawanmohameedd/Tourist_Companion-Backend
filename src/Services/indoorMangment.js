const indoorModels = require('../Models/indoorMangment')

async function add ({username , role, museum_name,location}){
    try{
        const newuser = indoorModels.adduser({username , role, museum_name,location})
        
        if(newuser){
            return newuser
        }
        return {error : 'Check what is wrong in services add user'}

    } catch (error){
        console.error('Error in add function:', error); 
        return {error : 'Failed to add this username location'}
    }
}

async function update ({username , location}){
    try{
        const updateduser = indoorModels.updateuser({username, location})

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

//website services 

module.exports = {
    add ,
    update,
    deletation
}