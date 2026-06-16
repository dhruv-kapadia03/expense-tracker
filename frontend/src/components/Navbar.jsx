import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl">💸</span>
                        <span className="text-lg font-bold text-indigo-600">Expense Tracker</span>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
                            Dashboard
                        </Link>
                        <Link to="/expenses" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
                            Expenses
                        </Link>
                        <div className="flex items-center gap-3 ml-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm bg-red-50 text-red-600 px-4 py-1.5 rounded-lg hover:bg-red-100 transition font-medium cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                    </div>
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-1"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/expenses"
                        onClick={() => setMenuOpen(false)}
                        className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-1"
                    >
                        Expenses
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left text-sm text-red-600 font-medium py-1 hover:text-red-700 cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;