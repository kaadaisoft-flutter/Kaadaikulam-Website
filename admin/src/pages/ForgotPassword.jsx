import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { logo } from '../assets/images';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: '' }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const actionCodeSettings = {
            url: "https://poondurai-kaadai-admin.vercel.app/",
            handleCodeInApp: false
        };

        try {
            await sendPasswordResetEmail(auth, data.email, actionCodeSettings);
            setIsEmailSent(true);
            toast.success("Password reset email sent");
        } catch (error) {
            console.error(error);
            if (error.code === "auth/user-not-found") {
                toast.error("Email not registered");
            } else {
                toast.error("Failed to send reset email. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-md overflow-hidden">
                        <img src={logo} alt="Poondurai Kaadai" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="mt-2 text-3xl font-serif font-bold text-gray-900">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isEmailSent
                            ? "Check your inbox for further instructions"
                            : "Enter your email to receive a reset link"}
                    </p>
                </div>

                {!isEmailSent ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                                        })}
                                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                                        placeholder="admin@poonduraikaadai.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-8 text-center space-y-6">
                        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-gray-600">
                            We've sent a password reset link to your email address. Please follow the link in the email to set a new password.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Back to Login
                        </Link>
                    </div>
                )}

                {!isEmailSent && (
                    <div className="text-center mt-6">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
