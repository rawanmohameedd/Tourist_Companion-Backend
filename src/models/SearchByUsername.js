const pool = require ('../postgres')

const getByUsernameTourguide = async (username) => {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM "tourguide" WHERE tourguide_username LIKE $1', [`%${username}%`]);
    client.release();
    return rows;
};

const getByUsernameTourist = async (username) => {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM "tourists" WHERE tour_username LIKE $1', [`%${username}%`]);
    client.release();
    return rows;
};
module.exports={
    getByUsernameTourguide,
    getByUsernameTourist,
}