const { get } = require('https');
const pool = require ('../postgres')

const getBssids = async (museum_name) => {
    const client = await pool.connect();
    const { rows } = await client.query(`SELECT bssid from Bssid where museum_name = $1`, [museum_name]);
    client.release();
    return rows;
};
module.exports ={
    getBssids
}