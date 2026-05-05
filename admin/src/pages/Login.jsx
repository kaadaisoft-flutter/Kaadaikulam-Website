import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { logo } from '../assets/images';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { login, isAuthenticated } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm({
        defaultValues: { email: '', password: '' }
    });

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    const onSubmit = async (data) => {
        const success = await login(data.email, data.password);
        if (!success) {
            setFormError('root', { message: 'Invalid credentials or not authorized as admin.' });
            toast.error('Invalid credentials', { id: 'login-error' });
        } else {
            toast.success('Welcome back!', { id: 'login-success' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <div className="mx-auto w-28 h-28 rounded-full flex items-center justify-center mb-4 shadow-md overflow-hidden">
                        <img src={logo} alt="Poondurai Kaadai" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="mt-2 text-3xl font-serif font-bold text-gray-900">Admin Portal</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to manage Poondurai Kaadai</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {errors.root && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start gap-2 text-sm">
                            <AlertCircle size={18} className="mt-0.5 shrink-0" />
                            <span>{errors.root.message}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                                })}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                                placeholder="admin@poonduraikaadai.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 4, message: 'Minimum 4 characters' }
                                    })}
                                    className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    tabIndex={-1}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            <div className="flex justify-end mt-1">
                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-medium text-primary hover:text-primary-light transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            <LogIn size={18} />
                            Sign in
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-500">
                            Sign in with your admin account
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
