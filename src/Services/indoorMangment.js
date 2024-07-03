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
async function crowdColors({ museum_name }) {
    try {
        const current = await indoorModels.crowdRooms({ museum_name });
        const capacities = await indoorModels.getCapacities({ museum_name });

        if (!capacities || capacities.length === 0) {
            return { error: "No capacities found" };
        }

        const roomCapacities = capacities.reduce((acc, capacity) => {
            const room_name = capacity.room_name;
            const avg = capacity.avg_capacity;
            const full = capacity.full_capacity;

            // Parse capacity location JSON
            const capacityLocation = JSON.parse(capacity.location);

            // Find the current capacity for this room
            const currentRoom = current.find(room => {
                try {
                    const currentLocation = JSON.parse(room.location);
                    return JSON.stringify(currentLocation) === JSON.stringify(capacityLocation);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return false;
                }
            });

            if (currentRoom) {
                const currentCapacity = parseInt(currentRoom.rowcount, 10);

                if (currentCapacity < avg) {
                    acc[room_name] = 1;
                } else if (currentCapacity >= avg && currentCapacity < full) {
                    acc[room_name] = 2;
                } else if (currentCapacity >= full) {
                    acc[room_name] = 3;
                }
            } else {
                console.warn(`No current capacity found for room: ${room_name}`);
            }

            return acc;
        }, {});

        console.log(roomCapacities);
        return roomCapacities;
    } catch (error) {
        console.error('Error in crowdColors:', error);
        return { error: "Couldn't compare between current and avg/full capacity" };
    }
}

// get the location to the user and map it to room name
async function getLocation({ museum_name, username }) {
    try {
        const location = await indoorModels.getlocation({ museum_name, username });

        const room_names = await indoorModels.getMuseumRooms(museum_name);

        // Hash map location to room name
        const locationToRoomName = room_names.reduce((acc, room) => {
            acc[room.location] = room.room_name; 
            return acc;
        }, {});

        console.log('Location to room name hash map:', locationToRoomName);
        console.log('parased location', location[0].location)

        const mappedLocation = locationToRoomName[location[0].location];

        console.log('Mapped location:', mappedLocation);

        if (mappedLocation) {
            return mappedLocation;
        }

        return location;
    } catch (error) {
        console.error('Error:', error);
        return { error: "This username isn't in this museum" };
    }
}



module.exports = {
    add ,
    update,
    deletation,
    crowd,
    getRooms,
    crowdColors,
    getLocation
}