import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import DeleteModal from '../components/DeleteModal';
import API from '../api/axios';

const categoryIcons = {
  Food: '🍔', Transport: '🚗', Shopping: '🛍️',
  Bills: '📄', Entertainment: '🎬', Other: '📦',
};

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Filters
    const [filterCategory, setFilterCategory] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const fetchExpenses = async () => {
        try {
            const res = await API.get('/expenses');
            setExpenses(res.data);
        } catch (err) {
            toast.error('Failed to load expenses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
        API.get('/expenses/categories').then((res) => setCategories(res.data));
    }, []);

    const handleDeleteConfirm = async () => {
        setDeleting(true);
        try {
            await API.delete(`/expenses/${deleteId}`);
            toast.success('Expense deleted');
            fetchExpenses();
            setDeleteId(null);
        } catch {
            toast.error('Failed to delete');
        } finally {
            setDeleting(false);
        }
    };

    // Filter + sort logic
    const filtered = expenses
        .filter((e) => {
            const d = new Date(e.expense_date);
            if (filterCategory && e.category_name !== filterCategory) return false;
            if (filterMonth && d.getMonth() + 1 !== parseInt(filterMonth)) return false;
            if (filterYear && d.getFullYear() !== parseInt(filterYear)) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.expense_date) - new Date(a.expense_date);
            if (sortBy === 'oldest') return new Date(a.expense_date) - new Date(b.expense_date);
            if (sortBy === 'highest') return Number(b.amount) - Number(a.amount);
            if (sortBy === 'lowest') return Number(a.amount) - Number(b.amount);
            return 0;
        });

    const totalFiltered = filtered.reduce((sum, e) => sum + Number(e.amount), 0);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = [...new Set(expenses.map((e) => new Date(e.expense_date).getFullYear()))];

    const clearFilters = () => {
        setFilterCategory('');
        setFilterMonth('');
        setFilterYear('');
        setSortBy('newest');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <DeleteModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">All Expenses</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {filtered.length} expense{filtered.length !== 1 ? 's' : ''} •{' '}
                                Total: <span className="font-semibold text-indigo-600">₹{totalFiltered.toLocaleString('en-IN')}</span>
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Categories</option>
                                {categories.map((c) => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>

                        <select
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Months</option>
                            {months.map((m, i) => (
                                <option key={i} value={i + 1}>{m}</option>
                            ))}
                        </select>

                        <select
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Years</option>
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="highest">Highest Amount</option>
                            <option value="lowest">Lowest Amount</option>
                        </select>
                    </div>

                    {(filterCategory || filterMonth || filterYear || sortBy !== 'newest') && (
                        <button
                            onClick={clearFilters}
                            className="mt-3 text-xs text-indigo-600 font-medium hover:underline cursor-pointer"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Expense Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center text-gray-400 text-sm">Loading...</div>
                        ) : filtered.length === 0 ? (
                            <div className="p-10 text-center">
                                <p className="text-4xl mb-3">🔍</p>
                                <p className="text-gray-500 font-medium">No expenses found</p>
                                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                            </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Expense</th>
                                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                                            <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                                            <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filtered.map((exp) => (
                                            <tr key={exp.id} className="hover:bg-gray-50 transition">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">{categoryIcons[exp.category_name] || '📦'}</span>
                                                        <span className="font-medium text-gray-800">
                                                            {exp.description || '—'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                                                        {exp.category_name}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-gray-500">
                                                    {new Date(exp.expense_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric',
                                                    })}
                                                </td>
                                                <td className="px-5 py-4 text-right font-bold text-gray-800">
                                                    ₹{Number(exp.amount).toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <button
                                                        onClick={() => setDeleteId(exp.id)}
                                                        className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-medium cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="sm:hidden divide-y divide-gray-50">
                                {filtered.map((exp) => (
                                    <div key={exp.id} className="px-4 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">
                                                {categoryIcons[exp.category_name] || '📦'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {exp.description || exp.category_name}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {exp.category_name} • {new Date(exp.expense_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-800">
                                                ₹{Number(exp.amount).toLocaleString('en-IN')}
                                            </span>
                                            <button
                                                onClick={() => setDeleteId(exp.id)}
                                                className="text-xs text-red-500 bg-red-50 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition font-medium cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Expenses;