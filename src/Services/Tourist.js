const Tourist = require('../Models/Tourist')
const user = require('../Utils/User')

async function SignupT({ tour_username, emailT, first_nameT, last_nameT, nationalityT, birthdayT, passwordT }) {
    if (!tour_username || !emailT || !first_nameT || !last_nameT || !nationalityT || !birthdayT || !passwordT) {
        return user.generateErrorMessage(400, "Missing Required Fields");
    }

    const existingEmail = await user.checkExistingEmail(emailT);
    if (existingEmail) {
        return user.generateErrorMessage(400, "Email is already in use");
    }
 
    const existingUsername = await user.checkExistingUsername(tour_username);
    if (existingUsername) {
        return user.generateErrorMessage(400, "Username is already in use");
    }
    if (!user.validEmail(emailT)) {
        return user.generateErrorMessage(400, "Invalid Email Format")
    }
    if (!user.validPassword(passwordT)) {
        return user.generateErrorMessage(400, "Password must contain : at least 8 characters contain unique chaaracter contain uppercase letter")
    }
    const encryptedpassword = user.ecncryptPassword(passwordT)

    token = user.generateToken(emailT, "tourist")
    const tourist = await Tourist.createTourist({ tour_username, emailT, first_nameT, last_nameT, nationalityT, birthdayT, encryptedpassword, token });
    if (!tourist) {
        return user.generateErrorMessage(400, "Internel Server Error")
    }
    return {
        value: tourist,
        token,
    }
}

async function signinT({ emailT, passwordT }) {

    if (!emailT || !passwordT) {
        return user.generateErrorMessage(400, "Missing Required Fields")
    }
    const tourist = await Tourist.signinTour({ emailT, passwordT })

    if (!tourist) {
        return user.generateErrorMessage(404, "Authentication Failed: Email or Password not Correct")
    }

    const token = user.generateToken(emailT, "tourist")

    return {
        value: tourist,
        token,
    }
}

async function uploadPhoto(url, username) {
    const tourist = await Tourist.uploadPhoto(url, username)
    console.log(tourist)
    if (!tourist) {
        return user.generateErrorMessage("400", "tourist not exist")
    }
    return { value: tourist }

}


module.exports = {
    SignupT,
    signinT,
    uploadPhoto
}