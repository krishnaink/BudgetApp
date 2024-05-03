const Expense = require('../models/expenseModel');
const Income = require('../models/incomeModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { getExpenses, getExpense, createExpense, deleteExpense, updateExpense } = require('../controllers/expenseController');
const { signupUser, loginUser } = require('../controllers/userController');
const { getAllIncome, getIncome, createIncome, deleteIncome, updateIncome } = require('../controllers/incomeController');

jest.mock('../models/expenseModel', () => ({
    find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue([]),
        }),
    }),
    findById: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
    findOneAndUpdate: jest.fn(),
}));

jest.mock('../models/incomeModel', () => ({
    find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue([]),
        }),
    }),
    findById: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
    findOneAndUpdate: jest.fn(),
}));

jest.mock('../models/userModel', () => ({
    signup: jest.fn(),
    login: jest.fn(),
}));

jest.mock('mongoose', () => ({
    Types: {
        ObjectId: {
            isValid: jest.fn(),
        },
    },
    Schema: function () { },
    model: jest.fn(),
}));

jest.mock('jsonwebtoken');

describe('Expense Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getExpenses', () => {
        it('should return all expenses', async () => {
            const req = { user: { _id: 'user_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const expenses = [{ _id: 'expense1' }, { _id: 'expense2' }];
            Expense.find.mockResolvedValue(expenses);

            await getExpenses(req, res);

            expect(Expense.find).toHaveBeenCalledWith({ user_id: 'user_id' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expenses);
        });
    });

    describe('getExpense', () => {
        it('should return a single expense', async () => {
            const req = { params: { id: 'expense_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const expense = { _id: 'expense_id', description: 'Test expense' };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Expense.findById.mockResolvedValue(expense);

            await getExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('expense_id');
            expect(Expense.findById).toHaveBeenCalledWith('expense_id');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expense);
        });

        it('should return 404 if expense is not found', async () => {
            const req = { params: { id: 'expense_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Expense.findById.mockResolvedValue(null);

            await getExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('expense_id');
            expect(Expense.findById).toHaveBeenCalledWith('expense_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such expense' });
        });
        it('should return 404 if id is not a valid ObjectId', async () => {
            const req = { params: { id: 'invalid_id' } };
            const res = {
                status: jest.fn().mockReturnThis(), json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(false);

            await getExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('invalid_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such expense' });
        });
    });

    describe('createExpense', () => {
        it('should create a new expense', async () => {
            const req = {
                body: {
                    description: 'Test expense',
                    amount: 100,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const expense = { _id: 'expense_id', ...req.body, user_id: 'user_id' };
            Expense.create.mockResolvedValue(expense);

            await createExpense(req, res);

            expect(Expense.create).toHaveBeenCalledWith({
                description: 'Test expense',
                amount: 100,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expense);
        });

        it('should return 400 if required fields are missing', async () => {
            const req = {
                body: {},
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await createExpense(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Please fill in all fields',
                emptyFields: ['category', 'amount', 'description'],
            });
        });
        it('should handle extremely large expense amount', async () => {
            const req = {
                body: {
                    description: 'Test expense',
                    amount: Number.MAX_SAFE_INTEGER,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const expense = { _id: 'expense_id', ...req.body, user_id: 'user_id' };
            Expense.create.mockResolvedValue(expense);

            await createExpense(req, res);

            expect(Expense.create).toHaveBeenCalledWith({
                description: 'Test expense',
                amount: Number.MAX_SAFE_INTEGER,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expense);
        });

        it('should handle extremely long expense description', async () => {
            const req = {
                body: {
                    description: 'a'.repeat(1000),
                    amount: 100,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const expense = { _id: 'expense_id', ...req.body, user_id: 'user_id' };
            Expense.create.mockResolvedValue(expense);

            await createExpense(req, res);

            expect(Expense.create).toHaveBeenCalledWith({
                description: 'a'.repeat(1000),
                amount: 100,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expense);
        });
        it('should return 400 if an error occurs', async () => {
            const req = {
                body: {
                    description: 'Test expense',
                    amount: 100,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Creation failed');
            Expense.create.mockRejectedValue(error);

            await createExpense(req, res);

            expect(Expense.create).toHaveBeenCalledWith({
                description: 'Test expense',
                amount: 100,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Creation failed' });
        });
    });

    describe('deleteExpense', () => {
        it('should delete an expense', async () => {
            const req = { params: { id: 'expense_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const expense = { _id: 'expense_id', description: 'Test expense' };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Expense.findOneAndDelete.mockResolvedValue(expense);

            await deleteExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('expense_id');
            expect(Expense.findOneAndDelete).toHaveBeenCalledWith({ _id: 'expense_id' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expense);
        });

        it('should return 404 if expense is not found', async () => {
            const req = { params: { id: 'expense_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Expense.findOneAndDelete.mockResolvedValue(null);

            await deleteExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('expense_id');
            expect(Expense.findOneAndDelete).toHaveBeenCalledWith({ _id: 'expense_id' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such expense' });
        });
        it('should return 404 if id is not a valid ObjectId', async () => {
            const req = { params: { id: 'invalid_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(false);

            await deleteExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('invalid_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such expense' });
        });
    });

    describe('updateExpense', () => {
        it('should update an expense', async () => {
            const req = {
                params: { id: 'expense_id' },
                body: { description: 'Updated description' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const expense = { _id: 'expense_id', description: 'Updated description' };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Expense.findOneAndUpdate.mockResolvedValue(expense);

            await updateExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('expense_id');
            expect(Expense.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: 'expense_id' },
                { description: 'Updated description' },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expense);
        });

        it('should return 404 if expense is not found', async () => {
            const req = {
                params: { id: 'expense_id' },
                body: { description: 'Updated description' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Expense.findOneAndUpdate.mockResolvedValue(null);

            await updateExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('expense_id');
            expect(Expense.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: 'expense_id' },
                { description: 'Updated description' },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such expense' });
        });
        it('should return 404 if id is not a valid ObjectId', async () => {
            const req = {
                params: { id: 'invalid_id' },
                body: { description: 'Updated description' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(false);

            await updateExpense(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('invalid_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such expense' });
        });
    });
});

describe('Income Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllIncome', () => {
        it('should return all sources of income', async () => {
            const req = { user: { _id: 'user_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const income = [{ _id: 'income1' }, { _id: 'income2' }];
            Income.find.mockResolvedValue(income);

            await getAllIncome(req, res);

            expect(Income.find).toHaveBeenCalledWith({ user_id: 'user_id' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(income);
        });
    });

    describe('getIncome', () => {
        it('should return a single source of income', async () => {
            const req = { params: { id: 'income_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const income = { _id: 'income_id', description: 'Test income' };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Income.findById.mockResolvedValue(income);

            await getIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('income_id');
            expect(Income.findById).toHaveBeenCalledWith('income_id');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(income);
        });

        it('should return 404 if income is not found', async () => {
            const req = { params: { id: 'income_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Income.findById.mockResolvedValue(null);

            await getIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('income_id');
            expect(Income.findById).toHaveBeenCalledWith('income_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such income' });
        });

        it('should return 404 if id is not a valid ObjectId', async () => {
            const req = { params: { id: 'invalid_id' } };
            const res = {
                status: jest.fn().mockReturnThis(), json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(false);

            await getIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('invalid_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such income' });
        });
    });

    describe('createIncome', () => {
        it('should create a new income', async () => {
            const req = {
                body: {
                    description: 'Test income',
                    amount: 100,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            
            const income = { _id: 'income_id', ...req.body, user_id: 'user_id' }; // Define the income object
            Income.create.mockResolvedValue(income);

            await createIncome(req, res);

            expect(Income.create).toHaveBeenCalledWith({
                description: 'Test income',
                amount: 100,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(income);
        });

        it('should return 400 if required fields are missing', async () => {
            const req = {
                body: {},
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await createIncome(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Please fill in all fields',
                emptyFields: ['category', 'amount', 'description'],
            });
        });

        it('should handle extremely large income amount', async () => {
            const req = {
                body: {
                    description: 'Test income',
                    amount: Number.MAX_SAFE_INTEGER,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const income = { _id: 'income_id', ...req.body, user_id: 'user_id' };
            Income.create.mockResolvedValue(income);

            await createIncome(req, res);

            expect(Income.create).toHaveBeenCalledWith({
                description: 'Test income',
                amount: Number.MAX_SAFE_INTEGER,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(income);
        });

        it('should handle extremely long income description', async () => {
            const req = {
                body: {
                    description: 'a'.repeat(1000),
                    amount: 100,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const income = { _id: 'income_id', ...req.body, user_id: 'user_id' };
            Income.create.mockResolvedValue(income);

            await createIncome(req, res);

            expect(Income.create).toHaveBeenCalledWith({
                description: 'a'.repeat(1000),
                amount: 100,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(income);
        });

        it('should return 400 if an error occurs', async () => {
            const req = {
                body: {
                    description: 'Test income',
                    amount: 100,
                    category: 'Test category',
                },
                user: { _id: 'user_id' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Creation failed');
            Income.create.mockRejectedValue(error);

            await createIncome(req, res);

            expect(Income.create).toHaveBeenCalledWith({
                description: 'Test income',
                amount: 100,
                category: 'Test category',
                user_id: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Creation failed' });
        });
    });

    describe('deleteIncome', () => {
        it('should delete an income', async () => {
            const req = { params: { id: 'income_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const income = { _id: 'income_id', description: 'Test income' };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Income.findOneAndDelete.mockResolvedValue(income);

            await deleteIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('income_id');
            expect(Income.findOneAndDelete).toHaveBeenCalledWith({ _id: 'income_id' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(income);
        });

        it('should return 404 if income is not found', async () => {
            const req = { params: { id: 'income_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Income.findOneAndDelete.mockResolvedValue(null);

            await deleteIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('income_id');
            expect(Income.findOneAndDelete).toHaveBeenCalledWith({ _id: 'income_id' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such income' });
        });
        it('should return 404 if id is not a valid ObjectId', async () => {
            const req = { params: { id: 'invalid_id' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(false);

            await deleteIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('invalid_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such income' });
        });
    });


    describe('updateIncome', () => {
        it('should update an income', async () => {
            const req = {
                params: { id: 'income_id' },
                body: { description: 'Updated description' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const income = { _id: 'income_id', description: 'Updated description' };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Income.findOneAndUpdate.mockResolvedValue(income);

            await updateIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('income_id');
            expect(Income.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: 'income_id' },
                { description: 'Updated description' },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(income);
        });

        it('should return 404 if income is not found', async () => {
            const req = {
                params: { id: 'income_id' },
                body: { description: 'Updated description' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(true);
            Income.findOneAndUpdate.mockResolvedValue(null);

            await updateIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('income_id');
            expect(Income.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: 'income_id' },
                { description: 'Updated description' },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such income' });
        });
        it('should return 404 if id is not a valid ObjectId', async () => {
            const req = {
                params: { id: 'invalid_id' },
                body: { description: 'Updated description' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mongoose.Types.ObjectId.isValid.mockReturnValue(false);

            await updateIncome(req, res);

            expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith('invalid_id');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'No such income' });
        });
    });
});

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('signupUser', () => {
        it('should create a new user and return a token', async () => {
            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const user = { _id: 'user_id' };
            User.signup.mockResolvedValue(user);
            jwt.sign.mockReturnValue('token');

            await signupUser(req, res);

            expect(User.signup).toHaveBeenCalledWith('test@example.com', 'password');
            expect(jwt.sign).toHaveBeenCalledWith({ _id: 'user_id' }, process.env.SECRET, { expiresIn: '3d' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', token: 'token' });
        });
        it('should handle extremely long email address', async () => {
            const req = { body: { email: 'a'.repeat(200) + '@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const user = { _id: 'user_id' };
            User.signup.mockResolvedValue(user);
            jwt.sign.mockReturnValue('token');

            await signupUser(req, res);

            expect(User.signup).toHaveBeenCalledWith('a'.repeat(200) + '@example.com', 'password');
            expect(jwt.sign).toHaveBeenCalledWith({ _id: 'user_id' }, process.env.SECRET, { expiresIn: '3d' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ email: 'a'.repeat(200) + '@example.com', token: 'token' });
        });

        it('should handle extremely long password', async () => {
            const req = { body: { email: 'test@example.com', password: 'a'.repeat(1000) } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const user = { _id: 'user_id' };
            User.signup.mockResolvedValue(user);
            jwt.sign.mockReturnValue('token');

            await signupUser(req, res);

            expect(User.signup).toHaveBeenCalledWith('test@example.com', 'a'.repeat(1000));
            expect(jwt.sign).toHaveBeenCalledWith({ _id: 'user_id' }, process.env.SECRET, { expiresIn: '3d' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', token: 'token' });
        });
        it('should return 400 if signup fails', async () => {
            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Signup failed');
            User.signup.mockRejectedValue(error);

            await signupUser(req, res);

            expect(User.signup).toHaveBeenCalledWith('test@example.com', 'password');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Signup failed' });
        });
    });


    describe('loginUser', () => {
        it('should log in a user and return a token', async () => {
            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const user = { _id: 'user_id' };
            User.login.mockResolvedValue(user);
            jwt.sign.mockReturnValue('token');

            await loginUser(req, res);

            expect(User.login).toHaveBeenCalledWith('test@example.com', 'password');
            expect(jwt.sign).toHaveBeenCalledWith({ _id: 'user_id' }, process.env.SECRET, { expiresIn: '3d' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', token: 'token' });
        });

        it('should return 400 if login fails', async () => {
            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Login failed');
            User.login.mockRejectedValue(error);

            await loginUser(req, res);

            expect(User.login).toHaveBeenCalledWith('test@example.com', 'password');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Login failed' });
        });

        it('should handle login with incorrect email format', async () => {
            const req = { body: { email: 'invalidemail', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Login failed');
            User.login.mockRejectedValue(error);

            await loginUser(req, res);

            expect(User.login).toHaveBeenCalledWith('invalidemail', 'password');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Login failed' });
        });
        it('should return 400 if an error occurs during login', async () => {
            const req = { body: { email: 'test@example.com', password: 'password' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Login failed');
            User.login.mockRejectedValue(error);

            await loginUser(req, res);

            expect(User.login).toHaveBeenCalledWith('test@example.com', 'password');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Login failed' });
        });
    });
});
