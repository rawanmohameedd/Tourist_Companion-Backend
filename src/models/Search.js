const pool = require ('../postgres')

const getByUsernameTourguide = async (username) => {
    const client = await pool.connect();
    const { rows } = await client.query(`
    SELECT tourguide_username, emailtg, first_nametg, last_nametg, nationalidtg, brithdaytg, spoken_langtg, profile_phototg, avgrating, isavailable
    FROM "tourguide"
    WHERE tourguide_username LIKE $1
    `, [`%${username}%`]);    
    client.release();
    return rows;
};

const getByUsernameTourist = async (username) => {
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT tour_username, emailt, first_namet, last_namet, nationalityt, brithdayt, profile_photot
        FROM "tourists"
        WHERE tour_username LIKE $1
    `, [`%${username}%`]);
    client.release();
    return rows;
};

const getByNationality = async (nationality) => {
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT tour_username, emailt, first_namet, last_namet, nationalityt, brithdayt, profile_photot
        FROM "tourists"
        WHERE nationalityt LIKE $1
    `, [`%${nationality}%`]);
    client.release();
    return rows;
};

module.exports={
    getByUsernameTourguide,
    getByUsernameTourist,
    getByNationality
}