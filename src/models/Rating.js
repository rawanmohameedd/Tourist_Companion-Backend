const pool = require ('../postgres')

const giveArate = async(user) =>{
    const client = await pool.connect()
    const {rows,rowCount}= await client.query(
        `INSERT INTO "rating_system" (tourguide_username, tour_username, rate, visit, date_of_the_visit) VALUES ($1, $2, $3, $4, $5) 
        RETURNING tourguide_username, tour_username, rate, visit, date_of_the_visit`, 
        [user.tourguide_username, user.tour_username, user.rate, user.visit, user.date_of_the_visit]
    )
    client.release()
    if (rowCount){
        return rows[0]
    }
    return null
}

const showRates = async (tourguide) => {
    const client = await pool.connect()
    const {rows, rowCount} = await client.query(
        'SELECT * FROM rating_system WHERE tourguide_username =$1', 
        [tourguide]
    )
    client.release()
    console.log("models",rows)
    if (rowCount){
        return rows
    }
    return null
}


const updateRate = async (avgrating, tourguide_username) => {
    try {
        const client = await pool.connect();
        const { rows, rowCount } = await client.query('UPDATE tourguide SET avgrating = $1 WHERE tourguide_username = $2', [avgrating, tourguide_username]);
        client.release();
        if (rowCount) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating tour guide rate:', error);
        throw error; 
    }
};

const touristVisits = async(tour_username)=>{
    const client = await pool.connect()
    const {rows, rowCount} = await client.query(
        'SELECT tourguide_username, rate, visit, date_of_the_visit FROM rating_system WHERE tour_username = $1',[tour_username]
    )
    client.release()
    if (rowCount){
        return rows
    }
    return null
}

module.exports = {
    giveArate,
    showRates,
    touristVisits,
    updateRate
}