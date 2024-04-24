const express = require('express');
const {
    getAllIncome,
    getIncome,
    createIncome,
    deleteIncome,
    updateIncome
} = require('../controllers/incomeController')
const requireAuth = require('../middleware/requireAuth')
//protect api routes based on user auth state
const router = express.Router()

router.use(requireAuth)

//GET all sources of income
router.get('/', getAllIncome)
//GET a source of income
router.get('/:id', getIncome)
//POST a source of income
router.post('/', createIncome)
//DELETE a source of income
router.delete('/:id', deleteIncome)
//UPDATE a source of income
router.patch('/:id', updateIncome)


module.exports = router