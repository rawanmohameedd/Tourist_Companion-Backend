const pool = require("../postgres")

const sendRequest = async (request) => {
    try {
        const client = await pool.connect();
        const { rowCount: existingRequestsCount } = await client.query(
            `SELECT * FROM "tourists_requests" WHERE tour_username = $1`, [request.tour_username]
        );
        if (existingRequestsCount) {
            return { error : "Can't connect to 2 tour guides at the same time" };
        } else if (request.is_one_visit) {
            const { rows, rowCount } = await client.query(
                `INSERT INTO "tourists_requests" (tour_username, tourguide_username, is_one_visit, visit_date, place) VALUES ($1, $2, $3, $4, $5) RETURNING tour_username, tourguide_username, is_one_visit, visit_date, place`, 
                [request.tour_username, request.tourguide_username, request.is_one_visit, request.visit_date, request.place]
            );
            client.release();
            if (rowCount) {
                return rows[0];
            }
        } else if (!request.is_one_visit) {
            const { rows, rowCount } = await client.query(
                `INSERT INTO "tourists_requests" (tour_username, tourguide_username, is_one_visit, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING tour_username, tourguide_username, is_one_visit, start_date, end_date`, 
                [request.tour_username, request.tourguide_username, request.is_one_visit, request.start_date, request.end_date]
            );
            client.release();
            if (rowCount) {
                return rows[0];
            }
        }
            return null;
    } catch (error) {
        console.error("Error sending request:", error.message);
        throw error; 
    }
};

const showAllRequests = async (tourguide_username)=>{
    try {
        const client = await pool.connect()
        const {rows, rowCount} = await pool.query(
            `SELECT * FROM "tourists_requests" WHERE tourguide_username = $1`, [tourguide_username]
        )
        client.release()
        if (rowCount){
            return {rows}
        }
        return {error: "This tourguide has no connected tourists"}
    } catch (error){
        return {error : "internal several error"}
    }
}

const acceptRequest = async ()=>{

}

const declineRequest = async (tour_username)=>{
    try {
        const client = await pool.connect()
        const {rowCount} = await pool.query (
            `DELETE FROM "tourists_requests" WHERE tour_username = $1`, [tour_username]
        )
        client.release()
        if (rowCount){
            return true
        }
        return false
    } catch (error){
        return {error : "internal several error"}
    }
}

const connectedTourist = async (tourguide_username)=>{
    try {
        const client = await pool.connect()
        const {rows, rowCount}= await pool.query(
            `SELECT tour_username FROM "tourists_requests" WHERE tourguide_username = $1`,[tourguide_username]
        )
        client.release()
        if (rowCount){
            return rows
        }
        return {error: "This tourguide has no connected tourists"}
    } catch (error){
        return {error : "internal several error"}
    }
}
const connectedTourguide = async (tour_username)=>{
    try {
        const client = await pool.connect()
        const {rows, rowCount}= await pool.query(
            `SELECT tourguide_username FROM "tourists_requests" WHERE tour_username = $1`,[tour_username]
        )
        client.release()
        if (rowCount){
            console.log('hena models',rows[0])
            return rows[0]
        }
        return {error: "This tourist has connected with any tourguide"}
    } catch (error){
        console.error("Error retrieving connected tour guide:", error);
        return {error : "internal several error"}
    }
}

module.exports ={
    sendRequest,
    showAllRequests,
    // acceptRequest,
    declineRequest,
    connectedTourguide,
    connectedTourist
}