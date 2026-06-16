const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Model */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Delete Expense</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Are you sure you want to delete this expense? This action cannot be undone.
                    </p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition disabled:opacity-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;