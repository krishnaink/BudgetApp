require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const expenseRoutes = require('./routes/expenses')
const userRoutes = require('./routes/user')
const incomeRoute = require('./routes/income')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//respond to http requests with routing
app.use('/api/expenses', expenseRoutes)
app.use('/api/user', userRoutes)
app.use('/api/income', incomeRoute)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })
