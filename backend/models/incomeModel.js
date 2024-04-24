//schema model for income data

const mongoose = require('mongoose')

const Schema = mongoose.Schema
//components for the schema of the income users will add to budget
//schema is the template that the data follows in the database
//so for our db, the income users add will always have a description, amount, and category
const incomeSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Income', incomeSchema)

