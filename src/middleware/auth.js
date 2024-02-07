const jwt = require("jsonwebtoken");
const T = require("../Models/Tourist");
const TG = require("../Models/Tourguide");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET);
        let user;
        if (decoded.userType === 'tourist') {
            user = await T.getByEmailT(decoded.email);
        } else if (decoded.userType === 'tourguide') {
            user = await TG.getByEmailTG(decoded.email);
        }
        if (!user) throw new Error("User not found");
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).send({
            message: "Not Authorized",
        });
    }
};

module.exports = auth;
