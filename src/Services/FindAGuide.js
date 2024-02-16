const User = require('../Models/FindAGuide')

async function searchByUsername(username) {
    try {
        const tourGuide = await User.getByUsername(username);
        
        const result = {
            tourGuides: tourGuide 
        };

        if(result){
            console.log("Results:", result);
            return result;
        }
        
        return { error: "there is no tourguide with this username"}
    } catch (error) {
        return { error: "Failed to find user" };
    }
}

async function searchBySpokenlang(spoken_lang){
    try{
        const tourGuide = await User.getBySpokenLang(spoken_lang);
        
        const result = {
            tourGuides: tourGuide 
        };

        if(result){
            console.log("Results:", result);
            return result;
        }
        
        return { error: "there is no tourguide speaks this language"}
    } catch (error){
        return { error : "Failed to find user"}
    }
}
module.exports={
    searchByUsername,
    searchBySpokenlang,
}