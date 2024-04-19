const pool = require ('../postgres')

const login = async ({ id, password }) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'SELECT * FROM "admins" WHERE id=$1 ', [id]
    )
    if (rowCount) {
        if (rows[0].password===password) {            
            delete rows[0].password;
            return rows[0];
        }
    }
    return null

};

module.exports={
    login
}