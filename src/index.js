const express = require('express');
const app= express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.get('/:test',(req,res) =>{
    res.send("hello");
});
app.listen(PORT, ()=> console.log(`server on ${PORT}`));