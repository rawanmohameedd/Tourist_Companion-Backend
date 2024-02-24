const pool = require ('../postgres')

const getByUsername = async (username) => {
    const client = await pool.connect();
    const { rows } = await client.query(`
    SELECT tourguide_username, emailtg, first_nametg, last_nametg, nationalidtg, brithdaytg, spoken_langtg, profile_phototg, avgrating, isavailable
    FROM "tourguide"
    WHERE tourguide_username LIKE $1`, [`%${username}%`]);    
    client.release();
    return rows;
};

const getBySpokenLang = async (spoken_lang) =>{
    const client = await pool.connect();
    const {rows} = await client.query(`
    SELECT tourguide_username, emailtg, first_nametg, last_nametg, nationalidtg, brithdaytg, spoken_langtg, profile_phototg, avgrating, isavailable
    FROM "tourguide"
    WHERE spoken_langtg LIKE $1`, [`%${spoken_lang}%`]);  
    client.release();
    return rows;
}
module.exports={
    getByUsername,
    getBySpokenLang,
}