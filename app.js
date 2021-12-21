const express = require('express')
const session = require('express-session')

const usersRoute = require('./routes/users')
const winesRoute = require('./routes/wines')


const store = new session.MemoryStore()
const app = express()

app.use(session({
    secret: 'dont tell',
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use((req, res, next) => {
    console.log(store)
    console.log(req.method)
    next()
})


//must include this an then the rest of the path in the routes file
app.use('/users', usersRoute)
app.use('/wines', winesRoute)


app.listen(3001, () => {
    console.log("listening on Port 3001")
})