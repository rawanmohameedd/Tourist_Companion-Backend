const pool = require ('../postgres')

const getAllmuseums = async () =>{
    const client = await pool.connect()
    const {rows , rowCount} = await client.query(
        'SELECT * FROM "museums"'
    )
    client.release()
    if (rowCount){
        return rows
    }

    return null
} 

const getById = async (musid) =>{
    const client = await pool.connect()
    const {rows , rowCount} = await client.query(
        'SELECT * FROM "museums" WHERE musid=$1',[musid]
    )
    client.release()
    if(rowCount){
        return rows[0]
    }

    return null
} 

const searchMuseum = async (museum)=>{
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT * FROM "museums"
        WHERE museum_name ILIKE $1
    `, [`%${museum}%`]);
    client.release();
    return rows;

}

const getByName = async (museum_name) =>{
    const client = await pool.connect()
    console.log("first",museum_name)
    const {rows , rowCount} = await client.query(
        'SELECT * FROM "museums" WHERE museum_name=$1',[museum_name]
    )
    client.release()
    if(rowCount){
        return rows[0]
    }

    return null
} 

const addMuseumText = async ({ museum_name, ticket_tourist, ticket_adult, ticket_student, museinfo }) => {
    const client = await pool.connect();
    const { rowCount } = await client.query(
        'INSERT INTO "museums" (museum_name, ticket_tourist, ticket_adult, ticket_student, museinfo) VALUES ($1, $2, $3, $4, $5)',
        [museum_name, ticket_tourist, ticket_adult, ticket_student, museinfo]
    );
    client.release();

    if (rowCount > 0) {
        console.log("Museum added successfully");
        return { success: true };
    } else {
        console.log("Failed to add museum");
        return { success: false };
    }
};

const addMuseumImage = async (url1, url2, museum_name) => {
    const client = await pool.connect()
    const {  rowCount } = await client.query('UPDATE museums SET map=$1 , museum_image=$2 where museum_name = $3', [url1, url2, museum_name])
    client.release()
    if (rowCount) {
        return true
    }
    return false
}

const deleteMuseum = async (museum_name) => {
    const client = await pool.connect()
    const { rowCount}= await client.query(
        'DELETE FROM "museums" WHERE museum_name = $1',
        [museum_name]
    );

    if (rowCount){
        console.log("Museum deleted successfully");
        return { success: true };
    } else {
        console.log("Failed to delete museum");
        return { success: false };
    }
}

const editMuseum = async ({ museum_name, ticket_tourist, ticket_adult, ticket_student, museinfo}) => {
    const client = await pool.connect()
    const {rowCount} = await client.query(
        'UPDATE "museums" SET  ticket_tourist=$2, ticket_adult=$3, ticket_student=$4, museinfo=$5 WHERE museum_name=$1',
        [
            museum_name,
            ticket_tourist,
            ticket_adult,
            ticket_student,
            museinfo,
        ]
    );
    client.release();

    if (rowCount) {
        console.log("Museum updated successfully");
        return { success: true };
    } else {
        console.log("Failed to update museum");
        return { success: false };
    }
}

module.exports={
    getAllmuseums,
    getById,
    getByName,
    searchMuseum,
    addMuseumText,
    addMuseumImage, 
    deleteMuseum, 
    editMuseum
}