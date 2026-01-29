import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '/#features' },
        { name: 'Templates', href: '/#templates' },
        { name: 'Pricing', href: '/#pricing' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-indigo-200">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                                ResumeAI
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors border-l pl-6 border-gray-200">
                                Login
                            </Link>
                        </div>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-100 active:scale-95 px-8"
                        >
                            Get Started
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-3 text-base font-semibold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Link
                                to="/login"
                                className="block px-4 py-3 text-base font-semibold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <div className="pt-4">
                                <Link
                                    to="/dashboard"
                                    className="block w-full text-center bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
