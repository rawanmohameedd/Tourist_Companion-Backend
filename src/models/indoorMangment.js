const pool = require ('../postgres')

const adduser = async ({ username,role,museum_name,location }) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'INSERT INTO Indoor_management (username,role,museum_name,location) VALUES ($1,$2,$3,$4) RETURNING *',
        [username,role,museum_name,location]
    )
    client.release()

    if (rowCount) {
        console.log(rows[0])
        return rows[0]
    }

    return null

};

const updateuser = async ({ username,location }) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'UPDATE Indoor_management set location = $1 where username = $2 RETURNING *',
        [location,username]
    )
    client.release()

    if (rowCount) {
        return rows[0]
    }
    return null
};

const deleteuser = async (username ) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'DELETE FROM Indoor_management WHERE username = $1',
        [username]
    )
    client.release()

    if (rowCount) {
        console.log(`User ${username} deleted successfully`); 
        return 'Deleted successfully'
    }
    console.log(`User ${username} not found`);
    return null
};

// Website models
const viewmuseumUsers = async (museum_name) =>{
    const client = await pool.connect()
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
        return rows
    }
    return {message:"There is no one in this room"}

}

module.exports={
    adduser,
    updateuser,
    deleteuser,
    viewmuseumUsers,
    filterUsersbyrooms
}