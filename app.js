const express = require('express');
//import express from 'express';
//cannot use import statement
//below gives us express functionality
const app = express();
const users = [{age: 21, email: "jgumerove"}, {age: 23, email: "jgums"}]
const authors = [{name: "steve"}, {name: "Joe"}, {name: "J.R Tolken"}]
app.use(express.urlencoded({ extended: false}))

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

//note -- adding a route parameter below
//note whate happen when req.params was logged to console
//route parameters can be dynamic
app.get("/users/:email", (req, res) => {
    const { email} = req.params
    const user = users.find((user) => user.email === email)
    if(user){
        //do not need to put the 200 status thing
        res.status(200).send(user)
    }
    else
    {
        res.send(404)
    }
})

app.get("/authors", (req, res) => {
    const { name } = req.query
    if (name) {
        const author = authors.find((author) => author.name === name)
        res.status(200).send(author)
    }

    else {
        res.status(404).send("not found")
    }
    // const user = users.find((user) => user.email === email)
})

app.post("/", (req, res) => {
    console.log(req.body)
})