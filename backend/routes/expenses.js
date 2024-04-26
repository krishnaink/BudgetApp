const express = require('express');
const {
    createExpense,
    getExpenses,
    getExpense,
    deleteExpense,
    updateExpense
} = require('../controllers/expenseController')
const requireAuth = require('../middleware/requireAuth')
//protect api routes based on user auth state
const router = express.Router()

router.use(requireAuth)

//GET all expenses
router.get('/', getExpenses)
//GET a single expense
router.get('/:id', getExpense)
//POST a new expense
router.post('/', createExpense)
//DELETE an expense
router.delete('/:id', deleteExpense)
//UPDATE an expense
router.patch('/:id', updateExpense)


module.exports = router