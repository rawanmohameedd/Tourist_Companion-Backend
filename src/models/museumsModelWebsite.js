const pool = require ('../postgres')

const viewStatus = async (musid) => {
    const client = await pool.connect()
    const {rows , rowCount} = await client.query('SELECT status FROM museums WHERE musid = $1',[musid])
    client.release()
    if(rowCount){
        return rows
    }
    return false
}

const updateStatus = async (musid) => {
    const client = await pool.connect()
    const { rows , rowCount} = await client.query(`UPDATE museums SET status = NOT museums.status WHERE musid = $1 RETURNING status`,[musid])
    client.release()
    if(rowCount){
        console.log(rows)
        return rows
    }
    return false
}

const addRooms  = async ({musid, room_name, avg_capcity, full_capcity}) =>{
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        `INSERT INTO museum_rooms (room_name, avg_capcity, full_capacity, musid)
        VALUES ($1, $2, $3, $4)
        RETURNING room_name, avg_capcity, full_capacity, musid`,
        [room_name, avg_capcity, full_capcity, musid]
    );
    client.release()
    if(rowCount){
        console.log("first",rows)
        return rows
    }
    return false
}

const viewmuseumUsers = async (museum_name) =>{
    const client = await pool.connect()
    console.log(museum_name,'fel models')
    const {rows , rowCount} = await client.query(
        `SELECT * FROM Indoor_management WHERE museum_name = $1` ,[museum_name]
    )

    client.release()

    if(rowCount){
        return rows
    }

    return {message : "There is no one in this museum"}
}

const filterUsersbyrooms = async (museum_name,location) =>{
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        `SELECT * FROM Indoor_management WHERE museum_name = $1 AND location = $2`,
        [museum_name, location]
    );
    client.release()

    if(rowCount){
        return {rows, rowCount}
    }
    return {message:"There is no one in this room"}

}
module.exports={
    viewStatus, 
    updateStatus,
    addRooms,
    viewmuseumUsers,
    filterUsersbyrooms
}