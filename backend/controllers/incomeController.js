const Income = require('../models/incomeModel');
const mongoose = require('mongoose')

//GET all sources of incomes
const getAllIncome = async (req, res) => {
    const user_id = req.user._id
    const currIncome = await Income.find({user_id}).sort({createdAt: -1})

    res.status(200).json(currIncome)
}

//GET a single source of income
const getIncome = async (req, res) => {
    const { id } = req.params
    //make sure id is valid by mongoose standards
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such income'})
    }

    const currIncome = await Income.findById(id)

    if (!currIncome) {
        return res.status(404).json({error: 'No such income'})
    }

    res.status(200).json(currIncome)

}

//CREATE a new source of income
const createIncome = async (req, res) => {
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

    //add a source of income to db
    try {
        const user_id = req.user._id
        const currentIncome = await Income.create({description, amount, category, user_id})
        res.status(200).json(income)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a source of income
const deleteIncome = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such income'})
    }

    const currIncome = await Income.findOneAndDelete({_id: id})

    if (!currIncome){
        return res.status(404).json({error: 'No such income'})
    }

    res.status(200).json(currIncome)
    
    
}
//UPDATE a source of income
const updateIncome = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such income'})
    }
    
    const currentIncome = await Income.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if (!currentIncome){
        return res.status(404).json({error: 'No such income'})
    }

    res.status(200).json(currentIncome)
}



module.exports = {
    getAllIncome,
    getIncome,
    createIncome,
    deleteIncome,
    updateIncome
}