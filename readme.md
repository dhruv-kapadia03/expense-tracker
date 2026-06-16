# 💸 Expense Tracker

A full-stack personal expense tracking web application built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MySQL**. Track your daily spending, organize by categories, and get a clear picture of where your money goes.

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js + Express |
| Database | MySQL (via MySQL Workbench) |
| Auth | JWT + bcryptjs |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Routing | React Router DOM |

---

## ✨ Features

- 🔐 **User Authentication** — Secure register and login with JWT tokens
- ➕ **Add Expenses** — Log expenses with category, amount, date, and description
- ✏️ **Edit & Delete** — Update or remove any expense with a confirmation modal
- 📋 **Recent Expenses** — Dashboard shows your 5 latest expenses at a glance
- 📊 **Summary Cards** — Total spent, this month's spending, and top category
- 🗂️ **Dedicated Expenses Page** — Full expense list with filters by category, month, and year
- 🔃 **Sort Options** — Sort by newest, oldest, highest, or lowest amount
- 🔔 **Toast Notifications** — Real-time feedback on every action
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop

---

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js     # Register & login logic
│   │   └── expenseController.js  # CRUD logic for expenses
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protection middleware
│   ├── migrations/
│   │   └── createTables.js       # DB table creation script
│   ├── models/
│   │   ├── userModel.js          # User DB queries
│   │   └── expenseModel.js       # Expense DB queries
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   └── expenseRoutes.js      # /api/expenses routes
│   ├── .env                      # Environment variables
│   └── server.js                 # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js          # Axios instance with interceptor
    │   ├── components/
    │   │   ├── DeleteModal.jsx   # Confirm delete modal
    │   │   ├── ExpenseForm.jsx   # Add / edit expense form
    │   │   ├── ExpenseList.jsx   # Expense list with edit/delete
    │   │   ├── Navbar.jsx        # Responsive navigation bar
    │   │   ├── ProtectedRoute.jsx# Route guard for auth
    │   │   └── SummaryCard.jsx   # Dashboard stat card
    │   ├── context/
    │   │   └── AuthContext.jsx   # Global auth state
    │   ├── pages/
    │   │   ├── Dashboard.jsx     # Main dashboard page
    │   │   ├── Expenses.jsx      # All expenses with filters
    │   │   ├── Login.jsx         # Login page
    │   │   └── Register.jsx      # Register page
    │   ├── App.jsx               # Routes setup
    │   └── main.jsx              # App entry point
    └── index.html
```

---

## 🗄️ Database Schema

### `users`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto increment |
| name | VARCHAR(100) | Full name |
| email | VARCHAR(100) | Unique email |
| password | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | Account creation time |

### `categories`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto increment |
| name | VARCHAR(50) | Category name (unique) |

> Default categories: Food, Transport, Shopping, Bills, Entertainment, Other

### `expenses`
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto increment |
| user_id | INT (FK) | References users.id |
| category_id | INT (FK) | References categories.id |
| amount | DECIMAL(10,2) | Expense amount |
| description | VARCHAR(255) | Optional note |
| expense_date | DATE | Date of expense |
| created_at | TIMESTAMP | Record creation time |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Login and receive a JWT token |

### Expenses *(all require Bearer token)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses for logged-in user |
| POST | `/api/expenses` | Add a new expense |
| PUT | `/api/expenses/:id` | Update an existing expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/expenses/categories` | Get all categories |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MySQL (MySQL Workbench recommended)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Set up the database

Open MySQL Workbench and create a new schema:

```
Schema name: expense_tracker
Charset: utf8mb4
```

### 3. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=your_db_name_here
DB_PORT=3306
PORT=5000
JWT_SECRET=your_secret_key_here
```

Run the migration to create tables:

```bash
node migrations/createTables.js
```

Start the backend server:

```bash
npm run dev
```

> Backend runs on `http://localhost:5000`

### 4. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173`

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host (usually `localhost`) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name (`your_db_name`) |
| `DB_PORT` | MySQL port (default `3306`) |
| `PORT` | Backend server port (default `5000`) |
| `JWT_SECRET` | Secret key for JWT signing |

---

## 🚀 Future Improvements

- Category-wise spending chart (Pie / Bar chart)
- Monthly spending trends (Line chart)
- Export expenses to CSV
- Budget limits per category with alerts
- Dark mode support

---

## 👨‍💻 Author

**Dhruv**  
Web Developer  
[GitHub](https://github.com/your-username) • [LinkedIn](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).