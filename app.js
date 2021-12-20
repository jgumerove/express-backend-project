const express = require('express');
const cookieParser = require('cookie-parser')
const { rest } = require('lodash');
//import express from 'express';
//cannot use import statement
//below gives us express functionality
const app = express();
const users = [{age: 21, email: "jgumerove"}, {age: 23, email: "jgums"}]
const authors = [{name: "steve"}, {name: "Joe"}, {name: "J.R Tolken"}]
const tests = [{test: "successful req"}]
//to enable us to send requests
app.use(express.urlencoded({ extended: false}))
//to enable us to retrieve json -- also a middleware function (detects JSON Payloads)
app.use(express.json())
//to enable use to use cookies -- note how we imported on top
app.use(cookieParser())






app.use((req, res, next) => {
console.log(req.method)
next()
})

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
    console.log("random")
    res.send({
        food: "turkey"
    })
})

app.get('/test', (req, res) => {
    console.log("good")
    res.status(200).send(tests)
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

app.post("/users", (req, res) => {
    const { authorization } = req.headers
    if (authorization && authorization === "3030") {
        console.log("successful login")
    }
    else
    {
        console.log("who are you")
    }
})

function authValidator(req, res, next){
    console.log("inside the auth section")
    const { authorization } = req.headers
    if(authorization && authorization === "54321"){
        console.log("correct auth")
        next()
    }
    else {
        res.send({ message: "Forbidden improper authorization"})
    }
}
app.post('/test', authValidator, (req, res) => {
    const test = req.body
    tests.push(test)
    res.status(201).send(test)
})

function validateCookie(req, res, next){
    const { cookies } = req
    if('session_id' in cookies){
        console.log("exists")
        if(cookies.session_id === '1991'){
            next()
        }
        else res.status(403).send({msg: "denied"})
    }
    else res.status(403).send({msg: "denied"})
}

app.get('/login', validateCookie, (req, res) => {
  //function on the response object -- cookie()
  res.cookie('session_id', '1991')
  res.status(200).json({msg: 'logged in'})
})

app.get('/protected', validateCookie, (req, res) => {
    res.status(200).json({msg: "you are authorized"})
})

//note -- server sends a session id
//browser sends a cookie 