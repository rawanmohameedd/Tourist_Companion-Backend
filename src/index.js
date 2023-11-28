const express = require('express')
const cors = require('cors')

const userAuth = require('./routers/Auth')
const app = express()

app.use(cors())

app.use(express.json())

app.use(userAuth)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running... on port: ${process.env.PORT}`)
})