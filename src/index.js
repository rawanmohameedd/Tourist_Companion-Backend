const express = require('express');
const app= express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname, '../', 'DB.sql'));
    //res.sendFile('./database/postgres.js', {root:__dirname});
});
app.listen(PORT, ()=> console.log(`server on ${PORT}`));