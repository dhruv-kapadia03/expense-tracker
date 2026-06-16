// import React from 'react'
// import { useAuth } from '../context/AuthContext'
// import Navbar from '../components/Navbar';

// const Dashboard = () => {

//     const { user, logout } = useAuth();

//     return (
//         <div className='min-h-screen bg-gray-50 p-6'>
//             <Navbar />
//             <div className='mx-auto max-w-4xl'>
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800">
//                         Welcome, {user?.name}
//                     </h1>
//                     <button
//                         onClick={logout}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
//                     >
//                         Logout
//                     </button>
//                 </div>
//                 <p className="text-gray-500">Dashboard content coming soon...</p>
//             </div>
//         </div>
//     )
// }

// export default Dashboard



import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import API from '../api/axios';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const res = await API.get('/expenses');
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchExpenses(); }, []);

    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    const thisMonth = expenses.filter((e) => {
        const d = new Date(e.expense_date);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const thisMonthTotal = thisMonth.reduce((sum, e) => sum + Number(e.amount), 0);

    const topCategory = expenses.reduce((acc, e) => {
        acc[e.category_name] = (acc[e.category_name] || 0) + Number(e.amount);
        return acc;
    }, {});
    const topCategoryName = Object.keys(topCategory).sort(
        (a, b) => topCategory[b] - topCategory[a]
    )[0] || '—';

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Here's your spending overview</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <SummaryCard
                        title="Total Spent"
                        value={`₹${totalSpent.toLocaleString('en-IN')}`}
                        icon="💰"
                        color="bg-indigo-50"
                    />
                    <SummaryCard
                        title="This Month"
                        value={`₹${thisMonthTotal.toLocaleString('en-IN')}`}
                        icon="📅"
                        color="bg-green-50"
                    />
                    <SummaryCard
                        title="Top Category"
                        value={topCategoryName}
                        icon="📊"
                        color="bg-orange-50"
                    />
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <div className="lg:col-span-1">
                        <ExpenseForm
                            onExpenseAdded={fetchExpenses}
                            editingExpense={editingExpense}
                            onUpdate={() => { fetchExpenses(); setEditingExpense(null); }}
                            onCancelEdit={() => setEditingExpense(null)}
                        />
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                                <p className="text-gray-400 text-sm">Loading expenses...</p>
                            </div>
                        ) : (
                            <ExpenseList
                                expenses={expenses}
                                onDelete={fetchExpenses}
                                onEdit={(exp) => setEditingExpense(exp)}
                                limit={5}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;