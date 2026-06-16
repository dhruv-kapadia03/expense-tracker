import { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';    
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';

const categoryIcons = {
    Food: '🍔', Transport: '🚗', Shopping: '🛍️',
    Bills: '📄', Entertainment: '🎬', Other: '📦',
};

const ExpenseList = ({ expenses, onDelete, onEdit, limit }) => {

    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const displayedExpenses = limit ? expenses.slice(0, limit) : expenses;
    const hasMore = limit && expenses.length > limit;

    // const handleDelete = async (id) => {
    //     if (!window.confirm('Delete this expense?')) return;
    //     try {
    //         await API.delete(`/expenses/${id}`);
    //         onDelete();
    //     } catch (err) {
    //         alert('Failed to delete');
    //     }
    // };

    const handleDeleteConfirm = async () => {
        setDeleting(true);
        try {
            await API.delete(`/expenses/${deleteId}`);
            toast.success('Expense deleted');
            onDelete();
            setDeleteId(null);
        } catch (err) {
            toast.error('Failed to delete expense');
        } finally {
        setDeleting(false);
        }
    };

    if (expenses.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
                <p className="text-4xl mb-3">🧾</p>
                <p className="text-gray-500 font-medium">No expenses yet</p>
                <p className="text-gray-400 text-sm mt-1">Add your first expense to get started</p>
            </div>
        );
    }

    // return (
    //     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    //         <div className="p-5 border-b border-gray-100">
    //             <h2 className="text-lg font-bold text-gray-800">Recent Expenses</h2>
    //         </div>

    //         <div className="divide-y divide-gray-50">
    //             {expenses.map((exp) => (
    //                 <div
    //                     key={exp.id}
    //                     className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
    //                 >
    //                     <div className="flex items-center gap-4">
    //                         <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">
    //                             {categoryIcons[exp.category_name] || '📦'}
    //                         </div>
    //                         <div>
    //                             <p className="text-sm font-semibold text-gray-800">
    //                                 {exp.description || exp.category_name}
    //                             </p>
    //                             <p className="text-xs text-gray-400 mt-0.5">
    //                             {exp.category_name} •{' '}
    //                             {new Date(exp.expense_date).toLocaleDateString('en-IN', {
    //                                 day: 'numeric', month: 'short', year: 'numeric',
    //                             })}
    //                             </p>
    //                         </div>
    //                     </div>

    //                     <div className="flex items-center gap-3">
    //                         <span className="text-base font-bold text-gray-800">
    //                             ₹{Number(exp.amount).toLocaleString('en-IN')}
    //                         </span>
    //                         <button
    //                             onClick={() => onEdit(exp)}
    //                             className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition font-medium cursor-pointer"
    //                         >
    //                             Edit
    //                         </button>
    //                         <button
    //                             onClick={() => handleDelete(exp.id)}
    //                             className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-medium cursor-pointer"
    //                         >
    //                             Delete
    //                         </button>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );

    return (
        <>
            <DeleteModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Recent Expenses</h2>
                    {/* {hasMore && (
                        <Link
                            to="/expenses"
                            className="text-sm text-indigo-600 font-medium hover:underline"
                        >
                            View all ({expenses.length})
                        </Link>
                    )} */}
                </div>

                <div className="divide-y divide-gray-50">
                    {/* {expenses.map((exp) => ( */}
                    {displayedExpenses.map((exp) => (
                        <div
                            key={exp.id}
                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0">
                                    {categoryIcons[exp.category_name] || '📦'}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {exp.description || exp.category_name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {exp.category_name} •{' '}
                                        {new Date(exp.expense_date).toLocaleDateString('en-IN', {
                                            day: 'numeric', month: 'short', year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-base font-bold text-gray-800">
                                    ₹{Number(exp.amount).toLocaleString('en-IN')}
                                </span>
                            <button
                                    onClick={() => onEdit(exp)}
                                    className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition font-medium cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => setDeleteId(exp.id)}
                                    className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-medium cursor-pointer"
                            >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="p-4 border-t border-gray-100 text-center">
                        <Link
                            to="/expenses"
                            className="text-sm text-indigo-600 font-medium hover:underline"
                        >
                            View all →
                            {/* View {expenses.length - limit} more expenses → */}
                            {/* View all ({expenses.length}) → */}
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default ExpenseList;