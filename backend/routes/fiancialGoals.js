const express = require('express');
const {
    getFinancialGoals,
    getFinancialGoal,
    createFinancialGoal,
    deleteFinancialGoal,
    updateFinancialGoal
} = require('../controllers/fiancialGoalController')
const requireAuth = require('../middleware/requireAuth')
//protect api routes based on user auth state
const router = express.Router()

router.use(requireAuth)

//GET all expenses
router.get('/', getFinancialGoals)
//GET a single expense
router.get('/:id', getFinancialGoal)
//POST a new expense
router.post('/', createFinancialGoal)
//DELETE an expense
router.delete('/:id', deleteFinancialGoal)
//UPDATE an expense
router.patch('/:id', updateFinancialGoal)


module.exports = router