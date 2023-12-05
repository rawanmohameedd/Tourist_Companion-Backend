const pool = require("../database/postgres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getByUsernameTG = async(username) => {
    const result = await pool.query('SELECT * FROM "tourguide" WHERE tourguide_username=$1',[username]);
    return result.rows.length > 0;
};

const getByEmailTG = async(email) => {
    const result = await pool.query('SELECT * FROM "tourguide" WHERE emailTG=$1',[email]);
    return result.rows.length > 0;
};

const createTourGuide = async (user) => {
    //Hashing user password
    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hash(user.passwordTG, salt);

    await pool.query(
        'INSERT INTO "tourguide" (tourguide_username,emailTG,first_nameTG,last_nameTG,nationalidTG,brithdayTG,spoken_langTG,passwordTG) VALUES ($1,$2,$3,$4,$5,$6::date,$7,$8)',
        [user.tourguide_username,user.emailTG,user.first_nameTG,user.last_nameTG,user.nationalidTG,user.brithdayTG,user.spoken_langTG,passwordHash]
    );
};

const signinTourGuide = async (email, password) => {
    const { rows } = await pool.query(
        'SELECT * FROM "tourguide" WHERE emailtg = $1',
        [email]
    );
    let user = rows[0];
    
    if (!user) {
    return null;
    }
    const isValid = await bcrypt.compare(password, user.passwordtg);

    if (!isValid) return null;
    const token = jwt.sign({ tourguide_username:user.tourguide_username } , "yarab");
    user.token = token;
    return user;
};

const getProfileData = async (username) => {
    const { rows } = await pool.query('SELECT * FROM "tourguide" WHERE tourguide_username = $1', [username
    ]);
    const user = rows[0];
    
    if (!user) return null;
    
    user.passwordtg = undefined;
    
    return user;
    };

module.exports={
    getByUsernameTG,
    getByEmailTG,
    createTourGuide,
    signinTourGuide,
    getProfileData
}