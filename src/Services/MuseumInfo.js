const Museum = require('../Models/MuseumInfo')

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

module.exports = {
    allMuseums,
    oneMuseum,
}