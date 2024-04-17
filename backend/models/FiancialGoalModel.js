//schema model for expense data

const mongoose = require('mongoose')

const Schema = mongoose.Schema
//components for the schema of the expenses users will add to budget
//schema is the template that the data follows in the database
//so for our db, the expenses users add will always have a description, amount, and category
const FinancialGoalSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('FinancialGoal', FinancialGoalSchema)

