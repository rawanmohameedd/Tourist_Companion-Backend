const T = require("../postgres");
const bcrypt= require("bcrypt")
const getByUsernameT = async(username) => {
    const result = await T.query('SELECT * FROM "tourists" WHERE tour_username=$1',[username]);
    return result.rows.length > 0 ;
};

const getByEmailT = async(email) => {
    const result = await T.query('SELECT * FROM "tourists" WHERE emailT=$1',[email]);
    return result.rows.length > 0;
};

const createTourist = async (user) => {

    await T.query(
        'INSERT INTO "tourists" (tour_username,emailT,first_nameT,last_nameT,nationalityT,brithdayT,passwordT,token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
        [user.tour_username,user.emailT,user.first_nameT,user.last_nameT,user.nationalityT,user.birthdayT,user.encryptedpassword,user.token]
    );
};

const signinTour = async (email,password) => {
    const userT= await T.query(
      'SELECT * FROM "tourists" WHERE emailT=$1 ',[email]
    )
    if (userT.length > 0) {
      const isPasswordValid = await bcrypt.compare(password, userT[0].passwordT);
      
      if (isPasswordValid) {
          // Remove the password before returning the user
          delete userT[0].passwordT;
          return userT[0];
      }
    }
    console.log(password)
    console.log(userT)
};

module.exports={
    getByUsernameT,
    getByEmailT,
    signinTour,
    createTourist,
}