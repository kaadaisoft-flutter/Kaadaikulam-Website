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
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-primary"></div>
                        <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Our Heritage & Stories</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-stone-900 leading-[1.1] mb-8"
                    >
                        Spiritual Journal & <br/>
                        <span className="text-primary italic">Community Updates</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl"
                    >
                        Explore the rich traditions, upcoming festivals, and cultural insights of our sacred community.
                    </motion.p>
                </header>

                {blogs.length === 0 ? (
                    <div className="text-center py-32 bg-white/50 rounded-[3rem] border border-stone-100">
                        <MessageSquare className="w-16 h-16 text-stone-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-serif font-bold text-stone-900">No stories shared yet</h3>
                        <p className="text-stone-500 mt-2">Check back soon for inspiring spiritual content.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
                        <AnimatePresence>
                            {blogs.map((blog, index) => (
                                <motion.article
                                    key={blog.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group flex flex-col bg-transparent"
                                >
                                    <Link to={`/blog/${blog.slug}`} className="block relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-stone-200/50">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute top-6 left-6">
                                            <span className="px-5 py-2 rounded-full bg-white/95 backdrop-blur-md text-stone-900 text-[10px] font-black uppercase tracking-[0.15em] shadow-xl">
                                                {blog.category || 'Festival'}
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center gap-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-primary/40" />
                                                {formatDate(blog.publishDate || blog.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User size={14} className="text-primary/40" />
                                                {blog.author || 'Admin'}
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-serif font-bold text-stone-900 group-hover:text-primary transition-colors duration-300 leading-tight mb-4">
                                            <Link to={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </h2>

                                        <p className="text-stone-500 text-base leading-relaxed mb-8 line-clamp-3">
                                            {blog.shortDescription || (blog.content?.replace(/<[^>]*>/g, '').slice(0, 150) + '...')}
                                        </p>

                                        <Link 
                                            to={`/blog/${blog.slug}`}
                                            className="inline-flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest group/btn mt-auto"
                                        >
                                            Read Full Story
                                            <div className="w-10 h-[1px] bg-primary/20 group-hover/btn:w-16 transition-all duration-500"></div>
                                            <ArrowRight size={16} className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-500" />
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
