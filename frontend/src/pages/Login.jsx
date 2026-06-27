// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import API from '../api/axios';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         try {
//             const res = await API.post('/auth/login', formData);
//             login(res.data.user, res.data.token);
//             navigate('/');
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//             <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
//                 <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
//                     Welcome Back
//                 </h2>
//                 <p className="text-sm text-gray-500 text-center mb-6">
//                     Login to manage your expenses
//                 </p>

//                 {error && (
//                     <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="you@example.com"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="••••••••"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
//                     >
//                         {loading ? 'Logging in...' : 'Login'}
//                     </button>
//                 </form>

//                 <p className="text-sm text-gray-500 text-center mt-6">
//                     Don't have an account?{' '}
//                     <Link to="/register" className="text-blue-600 font-medium hover:underline cursor-pointer">
//                         Register
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await API.post('/auth/login', formData);
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="hidden md:flex md:w-1/2 bg-indigo-600 flex-col justify-center items-center p-12 text-white">
                <div className="max-w-sm text-center">
                    <div className="text-5xl mb-6">💸</div>
                        <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
                        <p className="text-indigo-200 text-base leading-relaxed">
                            Take control of your finances. Track every rupee, understand your spending, and build better money habits.
                        </p>
                        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                            {['Smart Tracking', 'Categories', 'Insights'].map((f) => (
                                <div key={f} className="bg-indigo-500 rounded-xl p-3">
                                    <p className="text-xs font-medium text-indigo-100">{f}</p>
                                </div>
                            ))}
                        </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="md:hidden text-center mb-8">
                        <span className="text-4xl">💸</span>
                        <h1 className="text-2xl font-bold text-indigo-600 mt-2">Expense Tracker</h1>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
                    <p className="text-sm text-gray-500 mb-8">Login to your account</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />
                                <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline font-medium">
                                    Forgot password?
                                </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 mt-2 cursor-pointer"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;