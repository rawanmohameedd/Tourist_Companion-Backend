const Tourguide = require('../Models/Tourguide')
const user = require('../Utils/User')

async function SignupTG({ tourguide_username, emailTG, first_nameTG, last_nameTG, nationalidTG, birthdayTG, spoken_langTG, passwordTG }) {
    if (!tourguide_username || !emailTG || !first_nameTG || !last_nameTG || !nationalidTG || !birthdayTG || !spoken_langTG || !passwordTG) {
        return user.generateErrorMessage(400, "One or More Fields are Empty");
    }

    const existingEmail = await user.checkExistingEmail(emailTG);
    if (existingEmail) {
        return user.generateErrorMessage(400, "Email is already in use");
    }

    const existingUsername = await user.checkExistingUsername(tourguide_username);
    if (existingUsername) {
        return user.generateErrorMessage(400, "Username is already in use");
    }
    if (!user.validEmail(emailTG)) {
        return user.generateErrorMessage(400, "Invalid Email Format")
    }
    if (!user.validPassword(passwordTG)) {
        return user.generateErrorMessage(400, "Password must contain : at least 8 characters contain unique chaaracter contain uppercase letter")
    }
    const encryptedpassword = user.ecncryptPassword(passwordTG)

    token = user.generateToken(emailTG, "tourguide")
    let tourguide = await Tourguide.createTourGuide({ tourguide_username, emailTG, first_nameTG, last_nameTG, nationalidTG, birthdayTG, spoken_langTG, encryptedpassword, token });
    if (!tourguide) {
        return user.generateErrorMessage(400, "Internal Server Error")
    }

    return { 
        value: tourguide,
        token 
    }

}
async function SigninTG({ emailTG, passwordTG }) {

    if (!emailTG || !passwordTG) {
        return user.generateErrorMessage(400, "Missing Required Fields")
    }
    const tourguide = await Tourguide.signinTourguide({ emailTG, passwordTG })

    if (!tourguide) {
        return user.generateErrorMessage(404, "Authentication Failed: Email or Password not Correct")
    }

    const token = user.generateToken(emailTG, "tourguide")

    return {
        value: tourguide,
        token
    }
}

async function uploadPhoto(url, username) {
    const tourguide = await Tourguide.uploadPhoto(url, username)
    if (!tourguide) {
        return user.generateErrorMessage("400", "tourguide not exist")
    }
    return { value: tourguide }

}

async function deletePhoto(username) {
    const tourguide = await Tourguide.deletePhoto(username)
    if (!tourguide) {
        return user.generateErrorMessage("400", "tourguide not exist")
    }
    return { value: tourguide }

}

async function available (tourguide_username){
    try {
    const isAvaliable = await Tourguide.isAvaliable(tourguide_username)

    console.log('services',isAvaliable)
    if(isAvaliable !== null){
        return { value: isAvaliable}
    }
    return { error: "availablity can't be changed"}
    } catch (error){
        return user.generateErrorMessage("400", "can't change availablity")
    }
}

module.exports = {
    SignupTG,
    SigninTG,
    uploadPhoto,
    deletePhoto,
    available
}