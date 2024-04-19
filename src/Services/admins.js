const admin = require("../Models/admins")
const user = require ("../Utils/User")

async function loginServices({ id, password }) {

    if (!id || !password) {
        return user.generateErrorMessage(400, "Missing Required Fields")
    }
    const adminn = await admin.login({id,password})
    if (!adminn) {
        return user.generateErrorMessage(404, "Authentication Failed: Email or Password not Correct")
    }

    const token = user.generateToken(id, "admin")

    return {
        value: admin,
        token,
    }
}

module.exports={
    loginServices
}