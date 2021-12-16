const express = require('express');
//import express from 'express';
//cannot use import statement
//below gives us express functionality
const app = express();

app.listen(3001, () => console.log("listening on port 3001"))
app.get('/', (req, res) => {
    res.send(200)
});
