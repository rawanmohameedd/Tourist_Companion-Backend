require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const TGrouter = require('./Routes/Tourguide')
const Trouter = require('./Routes/Tourist')


app.use(cors());
app.use(express.json());

app.use(TGrouter)
app.use(Trouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port: ${process.env.PORT}`)
})
