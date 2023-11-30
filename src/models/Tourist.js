const pool = require("../database/postgres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getByUsername = async(username) => {
    const result = await pool.query('SELECT * FROM "tourists" WHERE tour_username=$1',[username]);
    return result.rows.length > 0 ;
};

const getByEmail = async(email) => {
    const result = await pool.query('SELECT * FROM "tourists" WHERE email=$1',[email]);
    return result.rows.length > 0;
};

const createTourist = async (user) => {
  //Hashing user password
    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hash(user.password, salt);

    await pool.query(
        'INSERT INTO "tourists" (tour_username,email,first_name,last_name,nationality,brithday,password) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [user.tour_username,user.email,user.first_name,user.last_name,user.nationality,user.brithday,passwordHash]
    );
};

const signinTour = async (email, password) => {
    const { rows } = await pool.query(
      'SELECT * FROM "tourists" WHERE email = $1',
      [email]
    );
    let user = rows[0];
    if (!user) {
      return null;
    }
  
    const isValid = await bcrypt.compare(password, user.password);
  
    if (!isValid) return null;
    const token = jwt.sign({ id: user.userid }, "yarab");
    user.token = token;
    return user;
  };

module.exports={
    getByUsername,
    getByEmail,
    signinTour,
    createTourist,
}