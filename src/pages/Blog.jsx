import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-20 max-w-4xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.2] mb-6"
                    >
                        Our Latest <span className="text-primary">Insights & Stories</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto"
                    >
                        Explore our spiritual journey, community highlights, and cultural explorations.
                    </motion.p>
                </header>

                {blogs.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                        <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900">No stories shared yet</h3>
                        <p className="text-gray-500 mt-2">Check back soon for inspiring spiritual content.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {blogs.map((blog, index) => (
                                <motion.article
                                    key={blog.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                                >
                                    <Link to={`/blog/${blog.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                                                {blog.category || 'BLOG'}
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <User size={12} />
                                                {blog.author || 'Admin'}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <Calendar size={12} />
                                                {formatDate(blog.publishDate || blog.createdAt)}
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight mb-4 line-clamp-2 min-h-[3.5rem]">
                                            <Link to={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </h2>

                                        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {blog.shortDescription || (blog.content?.replace(/<[^>]*>/g, '').slice(0, 150) + '...')}
                                        </p>

                                        <Link 
                                            to={`/blog/${blog.slug}`}
                                            className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs group/link mt-auto"
                                        >
                                            Read Full Article
                                            <ArrowRight size={14} className="transform group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
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
