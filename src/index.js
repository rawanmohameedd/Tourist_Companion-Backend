require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

const TourguideRouter = require('./Routes/Tourguide')
const TouristRouter = require('./Routes/Tourist')
const MuseumRouter = require('./Routes/MuseumInfo')
const SearchRouter = require('./Routes/SearchByUsername')

app.use(cors());
app.use(express.json());

app.use(TourguideRouter)
app.use(TouristRouter)
app.use(MuseumRouter)
app.use(SearchRouter)
app.use(express.static('uploads'));

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port: ${process.env.PORT}`)
})
