import pool from '../config/db.js';

const createTables = async () => {
    try {
        // Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Categories table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL UNIQUE
            )
        `);

        // Expenses table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS expenses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                category_id INT NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                description VARCHAR(255),
                expense_date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
            )
        `);

        // Insert some default categories
        await pool.query(`
            INSERT INTO categories (name)
            VALUES ('Food'), ('Transport'), ('Shopping'), ('Bills'), ('Entertainment'), ('Other')
            ON DUPLICATE KEY UPDATE name = name
        `);

        console.log('✅ Tables created successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating tables:', err);
        process.exit(1);
    }
};

createTables();