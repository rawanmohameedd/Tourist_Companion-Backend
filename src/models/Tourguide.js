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
    const cleanedUrl = url.startsWith('src\\') ? url.substring(4) : url
        console.log(url)
    const client = await pool.connect()
    const { rows, rowCount } = await client.query('UPDATE tourguide SET profile_photoTG=$1 where tourguide_username = $2', [cleanedUrl, username])
    client.release()
    if (rowCount) {
        return true
    }
    return false
}

const deletePhoto = async ( username) => {
    const client = await pool.connect()
    const { rows, rowCount } = await client.query('UPDATE tourguide SET profile_photoTG=NULLwhere tourguide_username = $1', [username])
    client.release()
    if (rowCount) {
        return true
    }
    return false
}

const isAvaliable = async (tourguide_username)=>{
    try {
    const client = await pool.connect()
    const { rows , rowCount} = await client.query('UPDATE tourguide SET isavailable = NOT tourguide.isavailable WHERE tourguide_username = $1 RETURNING *',[tourguide_username])
    client.release()
    console.log(rows[0].isavaliable)
    console.log(rowCount)

    if (rowCount){
        return rows[0]
    }
    return null;
    }
    catch (error){
        return {error: "can't update tourguide availablity"}
    }
}

const isPending = async (tourguide_username)=>{
    try {
    const client = await pool.connect()
    const { rows , rowCount} = await client.query('UPDATE tourguide SET pending = false WHERE tourguide_username = $1 RETURNING *',[tourguide_username])
    client.release()
    console.log(rows[0].isavaliable)
    console.log(rowCount)

    if (rowCount){
        return rows[0]
    }
    return null;
    }
    catch (error){
        return {error: "can't update tourguide availablity"}
    }
}

module.exports = {
    getByUsernameTG,
    getByEmailTG,
    createTourGuide,
    signinTourguide,
    getProfileTG,
    uploadPhoto,
    deletePhoto,
    isAvaliable,
    isPending
}