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

async function addMuseum ({museum_name , ticket_tourist , ticket_adult , ticket_student , museinfo}){
    try{
        if( !museum_name || !ticket_tourist ||!ticket_adult ||!ticket_student ||!museinfo )
        
        return user.generateErrorMessage(400 , "One or More fields are missing")

        const existingMuseum = await Museum.getByName(museum_name)
        if (existingMuseum)
            return user.generateErrorMessage(400, "There is already  a museum with this name")
    
    const museumData = await Museum.addMuseumText({museum_name , ticket_tourist , ticket_adult , ticket_student , museinfo })
    if (!museumData)
        return user.generateErrorMessage(400, "Internal Server error in services in museumData")

    return museumData
    } catch (error){
    console.error("Error adding museum:", error.message);
    return { error: "Internal Services Error" };
    }
}

async function edit ({museum_name , ticket_tourist , ticket_adult , ticket_student , museinfo}){
    try {
        const existingMuseum = await Museum.getByName(museum_name)
        if (!existingMuseum)
            return user.generateErrorMessage(400, "There is no museum with this name")

        const updatedData = await Museum.editMuseum({museum_name , ticket_tourist , ticket_adult , ticket_student , museinfo})
        if (!updatedData)
            return user.generateErrorMessage(400, "Internal Server error in services in edit museum data")
    
        return updatedData
    } catch (error){
        console.error("Error adding museum:", error.message);
        return { error: "Internal Services Error" };
    }
}

async function updateMap ({url , museum_name}){
    try{
        
        const Map = await Museum.updateMuseumMap({url , museum_name})
        console.log('el models rag3a menha eh',Map)
        if (Map)
            return Map

    }catch(error){
        console.error(error)
        return {error:"Internal Services Error"}
    }
}

async function updateImage ({url , museum_name}){
    try{
        
        const Map = await Museum.updateMuseumImage({url , museum_name})
        console.log('el models rag3a menha eh',Map)
        if (Map)
            return Map

    }catch(error){
        console.error(error)
        return {error:"Internal Services Error"}
    }
}

async function deleteMuseum (museum_name){
    try{
        const deleted = await Museum.deleteMuseum(museum_name)
        if (deleted)
            return deleted
        else 
            return null
    }catch(error){
        return { error: "Error deleting museum"}
    }
}

module.exports = {
    allMuseums,
    oneMuseum,
    search,
    addMuseum,
    edit, 
    deleteMuseum, 
    updateMap,
    updateImage
}