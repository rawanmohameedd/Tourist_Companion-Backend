const pool = require("../postgres");
const bcrypt = require("bcrypt")

const getByUsernameT = async (username) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'SELECT * FROM "tourists" WHERE tour_username=$1 ', [username]
    );
    client.release()
    if (rowCount) {

        return rows[0];
    }
    return null
};

const getByEmailT = async (email) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query('SELECT * FROM "tourists" WHERE emailT=$1', [email]);
    client.release()
    if (rowCount) {
        return rows[0]
    }
    return null
};

const createTourist = async (user) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'INSERT INTO "tourists" (tour_username,emailT,first_nameT,last_nameT,nationalityT,brithdayT,passwordT) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING tour_username , emailT , first_nameT , last_nameT , nationalityT , brithdayT , passwordT'
        [user.tour_username, user.emailT, user.first_nameT, user.last_nameT, user.nationalityT, user.birthdayT, user.encryptedpassword]
    )
    client.release()
    if (rowCount) {
        return rows[0]
    }
    return null
};

const signinTour = async ({ emailT, passwordT }) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'SELECT * FROM "tourists" WHERE emailT=$1 ', [emailT]
    )
    if (rowCount) {
        const isPasswordValid = await bcrypt.compare(passwordT, rows[0].passwordt);

        if (isPasswordValid) {
            // Remove the password before returning the user
            delete rows[0].passwordT;
            return rows[0];
        }
    }
    return null

};

const getProfileT = async (username) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'SELECT * FROM tourists WHERE tour_username = $1', [username]
    )
    client.release()
    if (rowCount) {
        return rows[0]
    }
    return null
}

module.exports = {
    getByUsernameT,
    getByEmailT,
    signinTour,
    createTourist,
    getProfileT
}