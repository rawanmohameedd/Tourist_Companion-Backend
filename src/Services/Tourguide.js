const TG = require( '../Models/Tourguide')
const user = require ('../Utils/User')

async function SignupTG ({tourguide_username ,emailTG,first_nameTG,last_nameTG,nationalidTG,birthdayTG,spoken_langTG,passwordTG}){
    if(!tourguide_username ||!emailTG||!first_nameTG||!last_nameTG||!nationalidTG||!birthdayTG||!spoken_langTG||!passwordTG){
        return user.generateErrorMessage(400,  "One or More Fields are Empty" );
    }

    const existingEmail = await user.checkExistingEmail(emailTG);
    if (existingEmail) {
        return user.generateErrorMessage(400, "Email is already in use" );
    }

    const existingUsername = await user.checkExistingUsername(tourguide_username);
    if (existingUsername) {
        return user.generateErrorMessage(400, "Username is already in use" );
    }
    if (!user.validEmail(emailTG)) {
        return user.generateErrorMessage(400, "Invalid Email Format")
    }
    if (!user.validPassword(passwordTG)) {
        return user.generateErrorMessage(400, "Password must contain : at least 8 characters contain unique chaaracter contain uppercase letter")
    }
    const encryptedpassword = user.ecncryptPassword(passwordTG)

    token= user.generateToken(emailTG)
    let userTG={tourguide_username ,emailTG,first_nameTG,last_nameTG,nationalidTG,birthdayTG,spoken_langTG,encryptedpassword,token}
    await TG.createTourGuide(userTG);
    return {
        value: userTG
    }
}
module.exports={
    SignupTG,
}