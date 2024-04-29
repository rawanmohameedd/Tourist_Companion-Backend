const Museum = require('../Models/MuseumInfo')
const user = require('../Utils/User')

async function allMuseums() {
    try {
        const museums = await Museum.getAllmuseums();

        if (museums) {
            return { value: museums };
        }

        return { error: "No museums found" };

    } catch (error) {
        return { error: "Failed to fetch museums" };
    }
}


async function oneMuseum(musid) {
    try {
        const museum = await Museum.getById(musid)

        if (!museum) {
            return { error: "Museum not found" }
        }
        return { value: museum }

    } catch (error) {
        return { error: "Faild to fetch this museum" }
    }
}

async function search (museum){
    try{
        const museumName = await Museum.searchMuseum (museum)
        const result = {
            museums: museumName || [],
        };

        if(result){
            console.log("Results:", result);
            return result;
        }
        
        return { error: "there is no musuems with this name"}
    } catch (error) {
        return { error: "Failed to find musuem" };
    }
}

async function addMuseum ({museum_name , ticket_tourist , ticket_adult , ticket_student , museinfo , files}){
    try{
        if( !museum_name || !ticket_tourist ||!ticket_adult ||!ticket_student ||!museinfo )
        
        return user.generateErrorMessage(400 , "One or More fields are missing")

        const existingMuseum = await Museum.getByName(museum_name)
        if (existingMuseum)
            return user.generateErrorMessage(400, "There is already  a museum with this name")
    
    const museumData = await Museum.addMuseumText({museum_name , ticket_tourist , ticket_adult , ticket_student , museinfo })
    if (!museumData)
        return user.generateErrorMessage(400, "Internal Server error in services in museumData")

    const map = files[0]
    const museum_image = files [1]
    const museumImage = await Museum.addMuseumImage({map , museum_image, museum_name})
    const data = {
        museumData,
        museumImage
    }
    return {data}
    } catch (error){
    console.error("Error adding museum:", error.message);
    return { error: "Internal Services Error" };
    }
}

async function edit ({museum_name , ticket_tourist , ticket_adult , ticket_student , museinfo}){
    try {
        
    } catch (error){
        console.error("Error adding museum:", error.message);
        return { error: "Internal Services Error" };
    }
}
module.exports = {
    allMuseums,
    oneMuseum,
    search,
    addMuseum,
    edit
}