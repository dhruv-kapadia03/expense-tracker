import { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const ExpenseForm = ({ onExpenseAdded, editingExpense, onUpdate, onCancelEdit }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: '',
        amount: '',
        description: '',
        expenseDate: new Date().toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');

    useEffect(() => {
        API.get('/expenses/categories').then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                categoryId: editingExpense.category_id,
                amount: editingExpense.amount,
                description: editingExpense.description || '',
                expenseDate: editingExpense.expense_date?.split('T')[0],
            });
        }
    }, [editingExpense]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // setError('');
        try {
            if (editingExpense) {
                await API.put(`/expenses/${editingExpense.id}`, formData);
                toast.success('Expense updated');
                onUpdate();
            } else {
                await API.post('/expenses', formData);
                toast.success('Expense added');
                onExpenseAdded();
            }
            setFormData({
                categoryId: '',
                amount: '',
                description: '',
                expenseDate: new Date().toISOString().split('T')[0],
            });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
            // setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    //         <h2 className="text-lg font-bold text-gray-800 mb-5">
    //             {editingExpense ? '✏️ Edit Expense' : '➕ Add Expense'}
    //         </h2>

    //         {error && (
    //             <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
    //                 {error}
    //             </div>
    //         )}

    //         <form onSubmit={handleSubmit} className="space-y-4">
    //             <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
    //                 <select
    //                     name="categoryId"
    //                     value={formData.categoryId}
    //                     onChange={handleChange}
    //                     required
    //                     className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer"
    //                 >
    //                     <option value="">Select category</option>
    //                         {categories.map((c) => (
    //                             <option key={c.id} value={c.id}>{c.name}</option>
    //                         ))}
    //                 </select>
    //             </div>

    //             <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (₹)</label>
    //                 <input
    //                     type="number"
    //                     name="amount"
    //                     value={formData.amount}
    //                     onChange={handleChange}
    //                     required
    //                     min="1"
    //                     placeholder="0.00"
    //                     className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
    //                 />
    //             </div>

    //             <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
    //                 <input
    //                     type="date"
    //                     name="expenseDate"
    //                     value={formData.expenseDate}
    //                     onChange={handleChange}
    //                     required
    //                     className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
    //                 />
    //             </div>

    //             <div>
    //                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
    //                     Description <span className="text-gray-400 font-normal">(optional)</span>
    //                 </label>
    //                 <input
    //                     type="text"
    //                     name="description"
    //                     value={formData.description}
    //                     onChange={handleChange}
    //                     placeholder="What was this for?"
    //                     className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
    //                 />
    //             </div>

    //             <div className="flex gap-3 pt-1">
    //                 <button
    //                     type="submit"
    //                     disabled={loading}
    //                     className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
    //                 >
    //                     {loading ? 'Saving...' : editingExpense ? 'Update' : 'Add Expense'}
    //                 </button>
    //                 {editingExpense && (
    //                     <button
    //                         type="button"
    //                         onClick={onCancelEdit}
    //                         className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition cursor-pointer"
    //                     >
    //                         Cancel
    //                     </button>
    //                 )}
    //             </div>
    //         </form>
    //     </div>
    // );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
                {editingExpense ? '✏️ Edit Expense' : '➕ Add Expense'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    >
                        <option value="">Select category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (₹)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                        placeholder="0.00"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                    <input
                        type="date"
                        name="expenseDate"
                        value={formData.expenseDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="What was this for?"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                <div className="flex gap-3 pt-1">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Saving...' : editingExpense ? 'Update' : 'Add Expense'}
                    </button>
                    {editingExpense && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;