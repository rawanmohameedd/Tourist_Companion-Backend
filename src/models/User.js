const pool = require("../database/postgres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getById = async(id) => {
    const result = await pool.query('SELECT * FROM "users" WHERE id=$1',[id]);
    return result.rows;
};

const getByMobile = async(mobile) => {
    const result = await pool.query('SELECT * FROM "users" WHERE mobile=$1',[mobile]);
    return result.rows;
};

const getByEmail = async(email) => {
    const result = await pool.query('SELECT * FROM "users" WHERE email=$1',[email]);
    return result.rows;
};

const createTourist = async (user) => {

  //Hashing user password
    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hash(user.password, salt);

    await pool.query(
        'INSERT INTO "users" (email,fname,lname,mobile,nationality,nationalid,brithday,password,spoken_lang,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [user.email,user.fname,user.lname,user.mobile,user.nationality,user.nationalid,user.brithday,passwordHash, user.spoken_lang,'Tourist']
    );
};

const createTourGuide = async (user) => {

    //Hashing user password
      const salt = await bcrypt.genSalt(8);
      const passwordHash = await bcrypt.hash(user.password, salt);
  
      await pool.query(
          'INSERT INTO "users" (email,fname,lname,mobile,nationality,nationalid,brithday,password,spoken_lang,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
          [user.email,user.fname,user.lname,user.mobile,user.nationality,user.nationalid,user.brithday,passwordHash, user.spoken_lang, 'Tour guide']
      );
  };
const signin = async (email, password) => {
    const { rows } = await pool.query(
      'SELECT * FROM "users" WHERE email = $1',
      [email]
    );
    let user = rows[0];
    if (!user) {
      const { rows } = await pool.query(
        'SELECT * FROM "users" WHERE email = $1',
        [email]
      );
      user = rows[0];
    }
  
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
    getById,
    getByEmail,
    getByMobile,
    signin,
    createTourist,
    createTourGuide
}