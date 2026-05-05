import React, { useState, useEffect } from 'react';
import { subscribeBlogs } from '../services/blogService';
import { Calendar, User, ArrowRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeBlogs((data) => {
            setBlogs(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="space-y-8">
                    <div className="h-12 w-64 bg-gray-200 animate-pulse rounded-lg mx-auto"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                <div className="h-56 bg-gray-200 animate-pulse"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                                    <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
                                    <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        Our Journal
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900"
                    >
                        Spiritual Stories & Updates
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        Explore the rich heritage and upcoming festivals of our community. 
                        Stay updated with real-time news and cultural insights.
                    </motion.p>
                </header>

                {blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 max-w-md mx-auto">
                            <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-gray-900">No blog posts yet</h3>
                            <p className="text-gray-500 mt-2">Check back soon for inspiring spiritual content.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {blogs.map((blog, index) => (
                                <motion.article
                                    key={blog.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                                {blog.category || 'Festival'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 p-8 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-primary/60" />
                                                {formatDate(blog.publishDate || blog.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User size={14} className="text-primary/60" />
                                                Admin
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-4 leading-tight">
                                            {blog.title}
                                        </h2>

                                        <p className="text-gray-500 line-clamp-3 mb-6 text-sm leading-relaxed">
                                            {blog.shortDescription || (blog.content?.replace(/<[^>]*>/g, '').slice(0, 150) + '...')}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-50">
                                            <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                                                Read More 
                                                <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
