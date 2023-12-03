const pool = require("../database/postgres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getByUsernameT = async(username) => {
    const result = await pool.query('SELECT * FROM "tourists" WHERE tour_username=$1',[username]);
    return result.rows.length > 0 ;
};

const getByEmailT = async(email) => {
    const result = await pool.query('SELECT * FROM "tourists" WHERE emailT=$1',[email]);
    return result.rows.length > 0;
};

const createTourist = async (user) => {
  //Hashing user password
    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hash(user.passwordT, salt);

    await pool.query(
        'INSERT INTO "tourists" (tour_username,emailT,first_nameT,last_nameT,nationalityT,brithdayT,passwordT) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [user.tour_username,user.emailT,user.first_nameT,user.last_nameT,user.nationalityT,user.brithdayT,passwordHash]
    );
};

const signinTour = async (email, password) => {
    const { rows } = await pool.query(
      'SELECT * FROM "tourists" WHERE emailT = $1',
      [email]
    );
    let user = rows[0];
    if (!user) {
      return null;
    }

    
    const isValid = await bcrypt.compare(password, user.passwordt);
  
    if (!isValid) return null;
    const token = jwt.sign({ tour_username:user.tour_username }, "yarab");
    user.token = token;
    return user;
  };

module.exports={
    getByUsernameT,
    getByEmailT,
    signinTour,
    createTourist,
}