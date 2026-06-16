import pool from '../config/db.js';

export const getAllCategories = async () => {
    const [rows] = await pool.query('SELECT * FROM categories');
    return rows;
}

export const createExpense = async (userId, categoryId, amount, description, expenseDate) => {
    const [result] = await pool.query(
        'INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES (?, ?, ?, ?, ?)',
        [userId, categoryId, amount, description, expenseDate]
    );
    return result.insertId;
};

export const getExpensesByUser = async (userId) => {
    const [rows] = await pool.query(
        `SELECT e.id, e.amount, e.description, e.expense_date, c.id AS category_id, c.name AS category_name
        FROM expenses e
        JOIN categories c ON e.category_id = c.id
        WHERE e.user_id = ?
        ORDER BY e.expense_date DESC`,
        [userId]
    );
    return rows;
};

export const getExpenseById = async (id, userId) => {
    const [rows] = await pool.query(
        'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
        [id, userId]
    );
    return rows[0];
};

export const updateExpense = async (id, userId, categoryId, amount, description, expenseDate) => {
    const [result] = await pool.query(
        `UPDATE expenses SET category_id = ?, amount = ?, description = ?, expense_date = ?
        WHERE id = ? AND user_id = ?`,
        [categoryId, amount, description, expenseDate, id, userId]
    );
    return result.affectedRows;
};

export const deleteExpense = async (id, userId) => {
    const [result] = await pool.query(
        'DELETE FROM expenses WHERE id = ? AND user_id = ?',
        [id, userId]
    );
    return result.affectedRows;
};