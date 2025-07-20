import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// --- SUPABASE SETUP ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// --- TYPE DEFINITIONS ---
type FormView = 'login' | 'signup';
type Message = {
    text: string;
    type: 'error' | 'success';
} | null;


// --- LOGIN PAGE COMPONENT ---
const LoginPage: React.FC = () => {
    const [view, setView] = useState<FormView>('login');
    const [message, setMessage] = useState<Message>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate=useNavigate();
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setMessage({ text: error.message, type: 'error' });
        } else {
            setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
            // In a real app, you'd use react-router-dom's useNavigate() here
            setTimeout(() =>navigate('/dashboard'),1500);
        }
        setLoading(false);
    };

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form['confirm-password'].value;

        if (password !== confirmPassword) {
            setMessage({ text: "Passwords do not match.", type: 'error' });
            return;
        }
        
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setMessage({ text: error.message, type: 'error' });
        } else {
            setMessage({ text: 'Signup successful! Please check your email to verify your account.', type: 'success' });
            setTimeout(() => setView('login'), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="w-full max-w-4xl m-4">
                <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
                    
                    {/* Left Panel: Branding */}
                    <div className="w-full md:w-1/2 p-12 text-white flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-500 z-0"></div>
                        <div className="absolute -top-20 -left-24 w-72 h-72 bg-white/10 rounded-full filter blur-3xl opacity-70"></div>
                        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-white/10 rounded-full filter blur-3xl opacity-80"></div>
                        <div className="absolute bottom-24 left-16 w-48 h-48 bg-white/5 rounded-full filter blur-2xl"></div>
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold mb-3">caura</h1>
                            <p className="text-lg mb-2">The future of transparent carbon accounting.</p>
                            <p className="text-sm opacity-80">Monitor emissions, manage offsets, and ensure accountability with our on-chain platform.</p>
                        </div>
                    </div>

                    {/* Right Panel: Form */}
                    <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white/80" style={{ backdropFilter: 'blur(10px)' }}>
                        
                        {/* Login Form */}
                        {view === 'login' && (
                            <form onSubmit={handleLogin}>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                                <p className="text-gray-600 mb-6">Please sign in to continue.</p>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input type="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input type="password" name="password" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="w-full mt-6 bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex justify-center items-center">
                                    {loading ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : 'Login'}
                                </button>
                                <p className="text-sm text-center text-gray-600 mt-6">
                                    Don't have an account? <button type="button" onClick={() => { setView('signup'); setMessage(null); }} className="font-semibold text-green-600 hover:underline">Sign up</button>
                                </p>
                            </form>
                        )}

                        {/* Signup Form */}
                        {view === 'signup' && (
                            <form onSubmit={handleSignup}>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                                <p className="text-gray-600 mb-6">Join caura and start your journey to carbon neutrality.</p>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input type="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input type="password" name="password" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                        <input type="password" name="confirm-password" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="w-full mt-6 bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex justify-center items-center">
                                    {loading ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : 'Create Account'}
                                </button>
                                <p className="text-sm text-center text-gray-600 mt-6">
                                    Already have an account? <button type="button" onClick={() => { setView('login'); setMessage(null); }} className="font-semibold text-green-600 hover:underline">Log in</button>
                                </p>
                            </form>
                        )}
                        
                        {/* Message Display */}
                        {message && (
                            <div className={`mt-4 text-sm text-center p-2 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message.text}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
