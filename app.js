const express = require('express');
//import express from 'express';
//cannot use import statement
//below gives us express functionality
const app = express();
const users = [{age: 21, email: "jgumerove"}, {age: 23, email: "jgums"}]

app.listen(3001, () => console.log("listening on port 3001"))
//below makes a get request -- notice takes in a call back as second param
app.get('/', (req, res) => {
    res.send({
        firstName: "Josh",
        lastName: "Gumerove"
    })
});
//get to another route
app.get("/users", (req, res) => {
    res.send(users)
})

//get to another route
app.get("/random", (req, res) => {
    res.send({
        food: "turkey"
    })
})
