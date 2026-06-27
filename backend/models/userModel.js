import pool from '../config/db.js';

export const createUser = async (name, email, hashedPassword) => {
    const [result] = await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );
    return result.insertId;
}

export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

export const updatePasswordByEmail = async (email, hashedPassword) => {
    const [result] = await pool.query(
        'UPDATE users SET password = ? WHERE email = ?',
        [hashedPassword, email]
    )
    return result.affectedRows;
}