const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const T = require('../Models/Tourist')
const TG = require('../Models/Tourguide')
require('dotenv').config()

async function checkExistingUsername(username) {
  const existingusername = await T.getByUsernameT(username) || await TG.getByUsernameTG(username);
  return existingusername;
}

async function checkExistingEmail(email) {
  const existingEmail = await T.getByEmailT(email) || await TG.getByEmailTG(email)
  return existingEmail;
}

function validPassword(password) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (password.match(regex))
    return true;

  return null
}

function validEmail(emailAdress) {
let regex = /^[\w._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z]{2,3})+$/;

  if (emailAdress.match(regex))
    return true;

  return null
}
function generateErrorMessage(statusCode, message) {
  return {
    statusCode,
    message
  }
}
function ecncryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

function generateToken(email, role) {
  console.log('email in generate token', email , role)
  const token = jwt.sign({ email: email, role: role }, process.env.SECRET
  )
  return token
}

module.exports = {
  checkExistingEmail,
  checkExistingUsername,
  validPassword,
  validEmail,
  generateErrorMessage,
  ecncryptPassword,
  generateToken
}