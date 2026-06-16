import { 
    createExpense, 
    deleteExpense, 
    getAllCategories, 
    getExpenseById, 
    getExpensesByUser,
    updateExpense
} from "../models/expenseModel.js";

export const fetchCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const addExpense = async (req, res) => {
    try {
        const { categoryId, amount, description, expenseDate } = req.body;
        const userId = req.user.id;

        if (!categoryId || !amount || !expenseDate) {
            return res.status(400).json({ message: 'categoryId, amount and expenseDate are required' });
        }

        const id = await createExpense(userId, categoryId, amount, description, expenseDate);
        res.status(201).json({ message: 'Expense added successfully', id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const fetchExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await getExpensesByUser(userId);
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const editExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryId, amount, description, expenseDate } = req.body;
        const userId = req.user.id;

        const existing = await getExpenseById(id, userId);
        if (!existing) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await updateExpense(id, userId, categoryId, amount, description, expenseDate);
        res.json({ message: 'Expense updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const removeExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const existing = await getExpenseById(id, userId);
        if (!existing) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await deleteExpense(id, userId);
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};