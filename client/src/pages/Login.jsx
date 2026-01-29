import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Sparkles, Github, Chrome } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center p-4">
            <Link to="/" className="flex items-center gap-2 group mb-8">
                <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    ResumeAI
                </span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-indigo-100 border border-gray-100 p-8 md:p-10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                    <p className="text-gray-500">Sign in to continue your career journey</p>
                </div>

                <div className="space-y-4 mb-8">
                    <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                        <Chrome className="w-5 h-5 text-red-500" />
                        Continue with Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                        <Github className="w-5 h-5" />
                        Continue with GitHub
                    </button>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                    <div className="relative flex justify-center text-sm uppercase"><span className="px-2 bg-white text-gray-400">Or email</span></div>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-bold text-gray-700">Password</label>
                            <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl outline-none transition-all"
                            />
                        </div>
                    </div>

                    <Link
                        to="/dashboard"
                        className="w-full block text-center py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-200"
                    >
                        Sign In
                    </Link>
                </form>

                <p className="text-center mt-8 text-gray-500">
                    Don't have an account? {' '}
                    <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
