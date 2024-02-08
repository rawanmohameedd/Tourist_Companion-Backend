const pool = require("../postgres");
const bcrypt = require("bcrypt")

const getByUsernameTG = async (username) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query('SELECT * FROM "tourguide" WHERE tourguide_username=$1', [username]);
    client.release()
    if (rowCount) {
        return rows[0]
    }
    return null
};

const getByEmailTG = async (email) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query('SELECT * FROM "tourguide" WHERE emailTG=$1', [email]);
    client.release()
    if (rowCount) {
        return rows[0]
    }
    return null
};

const createTourGuide = async (user) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query('INSERT INTO "tourguide" (tourguide_username,emailTG,first_nameTG,last_nameTG,nationalidTG,brithdayTG,spoken_langTG,passwordTG) VALUES ($1,$2,$3,$4,$5,$6::date,$7,$8) RETURNING tourguide_username,emailTG,first_nameTG,last_nameTG,nationalidTG,brithdayTG,spoken_langTG,passwordTG',
        [user.tourguide_username, user.emailTG, user.first_nameTG, user.last_nameTG, user.nationalidTG, user.birthdayTG, user.spoken_langTG, user.encryptedpassword]
    );
    client.release()
    if (rowCount) {
        return rows[0]
    }
    return null
};

const signinTourguide = async ({ emailTG, passwordTG }) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'SELECT * FROM "tourguide" WHERE emailTG=$1 ', [emailTG]
    )
    client.release()
    if (rowCount) {
        const isPasswordValid = await bcrypt.compare(passwordTG, rows[0].passwordtg);

        if (isPasswordValid) {
            // Remove the password before returning the user
            delete rows[0].passwordTG;
            return rows[0];
        }
    }
    return null

};

const getProfileTG = async (username) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query(
        'SELECT * FROM tourguide WHERE tourguide_username = $1', [username]
    )
    client.release()
    if (rowCount) {
        return rows[0]
    }
    return null
}

const uploadPhoto = async (url, username) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query('UPDATE tourguide SET profile_photoTG=$1 where tourguide_username = $2', [url, username])
    client.release()
    if (rowCount) {
        return true
    }
    return false
}

module.exports = {
    getByUsernameTG,
    getByEmailTG,
    createTourGuide,
    signinTourguide,
    getProfileTG,
    uploadPhoto
}