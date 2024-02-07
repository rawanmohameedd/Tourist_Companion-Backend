const TG = require("../postgres");
const bcrypt = require("bcrypt")
const getByUsernameTG = async(username) => {
    const result = await TG.query('SELECT * FROM "tourguide" WHERE tourguide_username=$1',[username]);
    return result.rows.length > 0;
};

const getByEmailTG = async(email) => {
    const result = await TG.query('SELECT * FROM "tourguide" WHERE emailTG=$1',[email]);
    return result.rows.length > 0;
};

const createTourGuide = async (user) => {
    await TG.query(
        'INSERT INTO "tourguide" (tourguide_username,emailTG,first_nameTG,last_nameTG,nationalidTG,brithdayTG,spoken_langTG,passwordTG,token) VALUES ($1,$2,$3,$4,$5,$6::date,$7,$8,$9)',
        [user.tourguide_username,user.emailTG,user.first_nameTG,user.last_nameTG,user.nationalidTG,user.birthdayTG,user.spoken_langTG, user.encryptedpassword , user.token]
    );
};

const signinTourguide = async ({ emailTG, passwordTG }) => {

    const { rows, rowCount } = await TG.query(
        'SELECT * FROM "tourguide" WHERE emailTG=$1 ', [emailTG]
    )
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


module.exports={
    getByUsernameTG,
    getByEmailTG,
    createTourGuide,
    signinTourguide,
}