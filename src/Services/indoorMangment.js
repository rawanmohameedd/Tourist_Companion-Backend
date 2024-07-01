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

//ashoof asmaa2 el rooms w el capacities bta3t kol museum
async function getRooms (museum_name){
    try {
        const roomNames = await indoorModels.getMuseumRooms(museum_name)

        if (roomNames)
            return roomNames
        return null
    } catch (error){
        return {error: "can't get rooms"}
    }
}

//araga3 el rowCount
async function crowd({ museum_name }) {
    try {
        const users = await indoorModels.crowdRooms({ museum_name });
        console.log('users', users);

        const room_names = await indoorModels.getMuseumRooms(museum_name);
        console.log('room_names', room_names);

        const roomNameToRowCount = room_names.reduce((acc, room) => {
            const matchingUser = users.find(user => {
                try {
                    const userLocation = JSON.parse(user.location);
                    const roomLocation = JSON.parse(room.location);
                    return JSON.stringify(userLocation) === JSON.stringify(roomLocation);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return false;
                }
            });

            if (matchingUser) {
                acc[room.room_name] = matchingUser.rowcount;
            } else {
                console.warn(`No matching user found for room: ${room.room_name}`);
            }
            
            return acc;
        }, {});

        console.log(roomNameToRowCount);
        return roomNameToRowCount;
    } catch (error) {
        console.error("Error fetching crowd information:", error);
        return { error: "Couldn't fetch crowd information" };
    }
}



// comapre current capacity with avg and full capacity
async function crowdColors ({museum_name}){
    try {
        const current = await indoorModels.crowdRooms({museum_name});
        const capacities = await indoorModels.getCapacities({museum_name});
        
        if (!capacities || capacities.length === 0) {
            return { error: "No capacities found" };
        }

        const avg = capacities[0].avg_capacity;
        const full = capacities[0].full_capacity;
        console.log('Capacities', current, avg, full);

        if (current < avg) {
            return 1;
        }
        if (current > avg && current < full) {
            return 2;
        }
        if (current > full) {
            return 3;
        }
        return null;
    } catch (error) {
        console.error('Error in crowdColors:', error);
        return { error: "couldn't compare between current and avg/full capacity" };
    }
}

module.exports = {
    add ,
    update,
    deletation,
    crowd,
    getRooms,
    crowdColors
}