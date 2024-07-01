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

const updateuser = async ({ username,museum_name,location }) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'UPDATE Indoor_management SET location = $1, museum_name = $3 WHERE username = $2 RETURNING *',
        [location,username,museum_name]
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

const getbyUsername = async(username) =>{
    const client = await pool.connect()
    const {rowCount } = await client.query(
        'select * from Indoor_management WHERE username = $1',
        [username]
    )
    client.release()

    if (rowCount) {
        console.log(`User ${username}  already exists`); 
        return 'already exists'
    } else {
        console.log(`User ${username} not found`);
        return null
    }
}

const crowdRooms = async({ museum_name }) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `SELECT location, COUNT(*) as rowCount
            FROM Indoor_management 
            WHERE museum_name = $1 
            GROUP BY location`,
            [museum_name]
        );
        client.release();
        console.log('result:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error in crowdRooms:', error);
        return { error: "Can't reach rooms users" };
    }
};


const getCapacities = async ({museum_name}) =>{
    try {
        const client = await pool.connect();
        const { rows, rowCount } = await client.query(
            `SELECT * FROM museum_rooms WHERE musuem_name=$1`,
            [museum_name]
        );
        client.release();
        if (rowCount) {
            return rows;
        }
        return null;
    } catch (error) {
        console.error('Error in getCapacities:', error);
        return { error: "can't get capacities" };
    }
};

const getMuseumRooms = async (museum_name) =>{
    try{
        const client = await pool.connect()
        const {rows, rowCount} = await client.query(
            `SELECT * FROM museum_rooms WHERE musuem_name=$1` , [museum_name]
        ) 
        client.release()
        if (rowCount)
            return rows
        return null
    }catch (error){
        return {error : "can't get rooms"}
    }
}


module.exports={
    adduser,
    updateuser,
    deleteuser,
    getbyUsername,
    crowdRooms,
    getCapacities,
    getMuseumRooms
}