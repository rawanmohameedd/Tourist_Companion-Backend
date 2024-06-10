require('dotenv').config()
const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();

const TourguideRouter = require('./Routes/Tourguide')
const TouristRouter = require('./Routes/Tourist')
const MuseumRouter = require('./Routes/MuseumInfo')
const SearchRouter = require('./Routes/Search');
const FindGuideRouter = require('./Routes/FindAGuide')
const RatingRouter = require('./Routes/Rating')
const RequestRouter = require("./Routes/TouristRequests")
const AdminsRouter = require ("./Routes/admins")
const ModelRouter = require("./Routes/ConnectWithFlask")
const MuseumModelRouter = require ("./Routes/museumsModel")

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
app.use(RatingRouter)
app.use(RequestRouter)
app.use(AdminsRouter)
app.use(ModelRouter)
app.use(MuseumModelRouter)

app.listen(process.env.PORT, () => {
    console.log(`Tourist companion is Running on port: ${process.env.PORT}`)
})
