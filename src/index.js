require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

const TourguideRouter = require('./Routes/Tourguide')
const TouristRouter = require('./Routes/Tourist')
const MuseumRouter = require('./Routes/MuseumInfo')
const SearchRouter = require('./Routes/SearchByUsername');
const FindGuideRouter = require('./Routes/FindAGuide')
const { dirname } = require('path');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/DbImages', express.static(path.join(__dirname, 'DbImages')));

app.use(TourguideRouter)
app.use(TouristRouter)
app.use(MuseumRouter)
app.use(SearchRouter)
app.use(FindGuideRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port: ${process.env.PORT}`)
})
