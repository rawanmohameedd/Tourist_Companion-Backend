require("dotenv").config();
const jwt = require("jsonwebtoken");
const T = require("../Models/Tourist");
const TG = require("../Models/Tourguide");

const auth = async (req, res, next) => {
    try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await T.getByEmailT(decoded.emailT) || await TG.getByEmailTG(decoded.emailTG);
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
    } catch (error) {
    res.status(401).send({
        message: "Not Authorized",
    });
    }
};

module.exports = auth;