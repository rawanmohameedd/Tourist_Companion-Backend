const express = require('express');
const cors = require('cors');
const TouristRouter = require('./routers/Tourist');
const TourguideRouter = require('./routers/Tourguide')
const app = express();

app.use(cors());
app.use(express.json());

app.use(TouristRouter);
app.use(TourguideRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is Running... on port: ${process.env.PORT}`)
})
