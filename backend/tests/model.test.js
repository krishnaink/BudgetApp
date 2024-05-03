const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Expense = require('../models/expenseModel');
const Income = require('../models/incomeModel');
const User = require('../models/userModel');

// Mock the dependencies
jest.mock('bcrypt');
jest.mock('validator');

describe('Expense Model', () => {
  beforeAll(() => {
    jest.setTimeout(10000); // Apply 10 seconds timeout to all tests in this block
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should throw an error if required fields are missing', async () => {
    const expenseData = {};

    await expect(Expense.create(expenseData)).rejects.toThrow(mongoose.Error.ValidationError);
  });
});

describe('Income Model', () => {
  beforeAll(() => {
    jest.setTimeout(10000); // Apply 10 seconds timeout to all tests in this block
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should throw an error if required fields are missing', async () => {
    const incomeData = {};

    await expect(Income.create(incomeData)).rejects.toThrow(mongoose.Error.ValidationError);
  });
});


describe('User Model', () => {
  beforeAll(() => {
    jest.setTimeout(10000); // Apply 10 seconds timeout to all tests in this block
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });
  describe('signup', () => {

    it('should throw an error if email is invalid', async () => {
      const email = 'invalidemail';
      const password = 'password';
      validator.isEmail.mockReturnValue(false);

      await expect(User.signup(email, password)).rejects.toThrow('Not a valid email');
    });

    it('should throw an error if password is weak', async () => {
      const email = 'test@example.com';
      const password = 'weak';
      validator.isEmail.mockReturnValue(true);
      validator.isStrongPassword.mockReturnValue(false);

      await expect(User.signup(email, password)).rejects.toThrow('Please choose a strong password');
    });

    it('should throw an error if email is already in use', async () => {
      const email = 'test@example.com';
      const password = 'password';
      validator.isEmail.mockReturnValue(true);
      validator.isStrongPassword.mockReturnValue(true);
      jest.spyOn(User, 'findOne').mockResolvedValue({ email });

      await expect(User.signup(email, password)).rejects.toThrow('Email is already in use');

      User.findOne.mockRestore();
    });
    it('should throw an error if email or password is missing', async () => {
      const email = '';
      const password = '';

      await expect(User.signup(email, password)).rejects.toThrow('All fields must be filled');
    });

    it('should create a new user with hashed password', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const salt = 'salt';
      const hash = 'hashedPassword';
      validator.isEmail.mockReturnValue(true);
      validator.isStrongPassword.mockReturnValue(true);
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue(salt);
      bcrypt.hash.mockResolvedValue(hash);
      jest.spyOn(User, 'create').mockResolvedValue({ email, password: hash });

      const user = await User.signup(email, password);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
      expect(User.create).toHaveBeenCalledWith({ email, password: hash });
      expect(user).toEqual({ email, password: hash });

      User.findOne.mockRestore();
      User.create.mockRestore();
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = {
        email,
        password: 'hashedPassword',
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);

      const loggedInUser = await User.login(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword');
      expect(loggedInUser).toBe(user);

      User.findOne.mockRestore();
    });

    it('should throw an error if email is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password';
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      await expect(User.login(email, password)).rejects.toThrow('Incorrect email');

      User.findOne.mockRestore();
    });

    it('should throw an error if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = {
        email,
        password: 'hashedPassword',
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      await expect(User.login(email, password)).rejects.toThrow('Incorrect password');

      User.findOne.mockRestore();
    });

    it('should throw an error if email is in incorrect format', async () => {
      const email = 'invalidemail';
      const password = 'password';
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      await expect(User.login(email, password)).rejects.toThrow('Incorrect email');

      User.findOne.mockRestore();
    });

    it('should throw an error if password is extremely long', async () => {
      const email = 'test@example.com';
      const password = 'a'.repeat(1000);
      const user = {
        email,
        password: 'hashedPassword',
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      await expect(User.login(email, password)).rejects.toThrow('Incorrect password');

      User.findOne.mockRestore();
    });
    it('should throw an error if email or password is missing', async () => {
      const email = '';
      const password = '';

      await expect(User.login(email, password)).rejects.toThrow('All fields must be filled');
    });
  });
});