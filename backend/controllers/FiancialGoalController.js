const FinancialGoal = require('../models/FiancialGoalModel');
const mongoose = require('mongoose')

//GET all FinancialGoals
const getFinancialGoals = async (req, res) => {
    const user_id = req.user._id
    const expenses = await FinancialGoal.find({user_id}).sort({createdAt: -1})

    res.status(200).json(FinancialGoal)
}

//GET a financial Goal
const getFinancialGoal = async (req, res) => {
    const { id } = req.params
    //make sure id is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such financial goal'})
    }

    const financeGoal = await FinancialGoal.findById(id)

    if (!financeGoal) {
        return res.status(404).json({error: 'No such financial goal'})
    }

    res.status(200).json(financeGoal)

}

//CREATE a new financial Goal
const createFinancialGoal = async (req, res) => {
    const {name, amount} = req.body

    let emptyFields = []

    if (!category){
        emptyFields.push('name')
    }
    if (!amount){
        emptyFields.push('amount')
    }

    if(emptyFields.length >0){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields})
    }
    //add FinancialGoal to db
    try {
        const user_id = req.user._id
        const expense = await FinancialGoal.create({name, amount, user_id})
        res.status(200).json(expense)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a financial Goal
const deleteFinancialGoal = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such financial goal'})
    }

    const financeGoal = await FinancialGoal.findOneAndDelete({_id: id})

    if (!expense){
        return res.status(404).json({error: 'No such financial goal'})
    }

    res.status(200).json(financeGoal)
    
    
}
//UPDATE a financial Goal
const updateFinancialGoal = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such financial goal'})
    }
    
    const financeGoal = await FinancialGoal.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if (!financeGoal){
        return res.status(404).json({error: 'No such financial goal'})
    }

    res.status(200).json(financeGoal)
}



module.exports = {
    getFinancialGoals,
    getFinancialGoal,
    createFinancialGoal,
    deleteFinancialGoal,
    updateFinancialGoal
}