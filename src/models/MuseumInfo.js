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

module.exports={
    getAllmuseums,
    getById,
}