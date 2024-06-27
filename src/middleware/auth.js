const jwt = require("jsonwebtoken");
const T = require("../Models/Tourist");
const TG = require("../Models/Tourguide");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader.replace("Bearer ", "");

        // Check if the token has three parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error("Token is not in correct format");
        }
        const decoded = jwt.verify(token, process.env.SECRET);

        if (!decoded.email || !decoded.role) {
            throw new Error("Invalid token payload");
        }

        let user;
        if (decoded.role === 'tourist') {
            user = await T.getByEmailT(decoded.email);
        } else if (decoded.role === 'tourguide') {
            user = await TG.getByEmailTG(decoded.email);
        }

        if (!user) {
            throw new Error("User not found");
        }

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
