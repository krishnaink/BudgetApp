const Expense = require('../models/expenseModel');
const mongoose = require('mongoose')

//GET all expenses
const getExpenses = async (req, res) => {
    const user_id = req.user._id
    const expenses = await Expense.find({ user_id });
    const sortedExpenses = expenses.slice().sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(sortedExpenses);
}

//GET a single expense
const getExpense = async (req, res) => {
    const { id } = req.params
    //make sure id is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such expense'})
    }

    const expense = await Expense.findById(id)

    if (!expense) {
        return res.status(404).json({error: 'No such expense'})
    }

    res.status(200).json(expense)

}

//CREATE a new expense
const createExpense = async (req, res) => {
    const {description, amount, category} = req.body

    let emptyFields = []

    if (!category){
        emptyFields.push('category')
    }
    if (!amount){
        emptyFields.push('amount')
    }
    if (!description){
        emptyFields.push('description')
    }
    if(emptyFields.length >0){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields})
    }
    
    //add expense to db
    try {
        const user_id = req.user._id
        const expense = await Expense.create({description, amount, category, user_id})
        res.status(200).json(expense)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//DELETE an expense
const deleteExpense = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such expense'})
    }

    const expense = await Expense.findOneAndDelete({_id: id})

    if (!expense){
        return res.status(404).json({error: 'No such expense'})
    }

    res.status(200).json(expense)
    
    
}
//UPDATE an expense
const updateExpense = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such expense'})
    }
    
    const expense = await Expense.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if (!expense){
        return res.status(404).json({error: 'No such expense'})
    }

    res.status(200).json(expense)
}



module.exports = {
    getExpenses,
    getExpense,
    createExpense,
    deleteExpense,
    updateExpense
}