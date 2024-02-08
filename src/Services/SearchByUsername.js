const User = require('../Models/SearchByUsername')

async function searchByUsername(username) {
    try {
        const tourist = await User.getByUsernameTourist(username);
        const tourGuide = await User.getByUsernameTourguide(username);
        
        const result = {
            tourists: tourist || [],
            tourGuides: tourGuide || []
        };

        if(result){
            console.log("Results:", result);
            return result;
        }
        
        return { error: "there is no username with these letters"}
    } catch (error) {
        return { error: "Failed to find user" };
    }
}


module.exports={
    searchByUsername,
}