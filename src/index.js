const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/Tourists&Tourguide');
const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is Running... on port: ${process.env.PORT}`)
})
