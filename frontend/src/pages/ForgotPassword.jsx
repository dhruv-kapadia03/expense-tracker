// import React from 'react'

// const ForgotPassword = () => {
//     return (
//         <div>
//             {/* Left panel */}
//             <div>
//                 <div>
//                     <div className="text-5xl mb-6">🔐</div>
//                     <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
//                     <p className="text-indigo-200 text-base leading-relaxed">
//                         Enter your registered email and set a new password to regain access.
//                     </p>
//                     <div className="mt-10 space-y-3 text-left">
//                         {[
//                             '✅ Enter your registered email',
//                             '✅ Set a strong new password',
//                             '✅ Login with new credentials',
//                         ].map((item) => (
//                             <p key={item} className="text-sm text-indigo-100">{item}</p>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ForgotPassword




import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api/axios';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // step 1: enter email, step 2: enter new password
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await API.post('/auth/reset-password', {
                email,
                newPassword: 'check_only',
            });
        } catch (err) {
            // If error is "No account found", show it
            if (err.response?.data?.message === 'No account found with this email') {
                toast.error('No account found with this email');
                setLoading(false);
                return;
            }
            // Any other error means email exists, proceed to step 2
        } finally {
            setLoading(false);
        }
        setStep(2);
    };


    const handleCheckEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await API.post('/auth/reset-password', { email, newPassword });
            toast.success('Password reset successful! Please login.');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="hidden md:flex md:w-1/2 bg-indigo-600 flex-col justify-center items-center p-12 text-white">
                <div className="max-w-sm text-center">
                    <div className="text-5xl mb-6">🔐</div>
                    <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
                    <p className="text-indigo-200 text-base leading-relaxed">
                        Don't worry, it happens. Enter your registered email and set a new password to regain access.
                    </p>
                    <div className="mt-10 space-y-3 text-left">
                        {[
                            '✅ Enter your registered email',
                            '✅ Set a strong new password',
                            '✅ Login with new credentials',
                        ].map((item) => (
                            <p key={item} className="text-sm text-indigo-100">{item}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-md">

                    {/* Mobile header */}
                    <div className="md:hidden text-center mb-8">
                        <span className="text-4xl">🔐</span>
                        <h1 className="text-2xl font-bold text-indigo-600 mt-2">Reset Password</h1>
                    </div>

                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>1</div>
                        <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                         step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>2</div>
                    </div>

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">Find your account</h2>
                            <p className="text-sm text-gray-500 mb-8">
                            Enter the email address linked to your account
                            </p>

                            <form onSubmit={handleCheckEmail} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? 'Checking...' : 'Continue'}
                                </button>
                            </form>
                        </>
                    )}

                    {/* Step 2: New Password */}
                    {step === 2 && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">Set new password</h2>
                            <p className="text-sm text-gray-500 mb-8">
                                Choose a strong password for{' '}
                                <span className="text-indigo-600 font-medium">{email}</span>
                            </p>

                            <form onSubmit={handleResetSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                    {confirmPassword && newPassword !== confirmPassword && (
                                        <p className="text-xs text-red-500 mt-1.5">Passwords do not match</p>
                                    )}
                                {confirmPassword && newPassword === confirmPassword && (
                                        <p className="text-xs text-green-500 mt-1.5">✓ Passwords match</p>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition cursor-pointer"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
                                    >
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    <p className="text-sm text-gray-500 text-center mt-8">
                        Remember your password?{' '}
                        <Link to="/login" className="text-indigo-600 font-semibold hover:underline cursor-pointer">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;