const User = require('../Models/Search')

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

async function searchByNationality(nationality) {
    try {
        const tourist = await User.getByNationality(nationality);
        
        const result = {
            tourists: tourist || [],
        };

        if(result){
            console.log("Results:", result);
            return result;
        }
        
        return { error: "there is no tourist with this nationality"}
    } catch (error) {
        return { error: "Failed to find user" };
    }
}


module.exports={
    searchByUsername,
    searchByNationality,
}