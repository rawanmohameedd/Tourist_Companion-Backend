const pool = require('../database/postgres')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const signUp =async(user)=>{
         // check for email exist
         const { rows } = await pool.query('SELECT * FROM "users" where email = $1',[user.email]);
         if(rows[0]){
            return null;
         }
          // create student
          const hashedPassword = bcrypt.hashSync(
            `${user.password}${config.SECRETHASHINGKEY}`,
            8
          );
          user.password = hashedPassword;
          // save student
          await pool.query('INSERT INTO users Values ($1, $2, $3, $4, $5, $6, $6, $7)', 
          [user.fname, user.lname, user.email, user.password, user.role, user.nationality, user.mobile])
}

const login =async(user)=>{
    // check for email exist
    const { rows } = await pool.query('SELECT * FROM "users" where email = $1 AND passowrd = $2 AND role= $3',
    [user.email, user.password, user.role]);
    if(rows[0]){
       if(bcrypt.compareSync(`${user.password}${config.SECRETHASHINGKEY}`,rows[0].password)){
        const token = jwt.sign(
            {
              id: user.id,
              role: loginRequestDto.role,
            },
            config.SECRETJWTKEY,
            { expiresIn: "24h" }
          );
          return {token: token, user: rows[0]};

      }
      else{
        return null
      }
    }
}

module.exports = {
    login: login,
    signUp: signUp
}