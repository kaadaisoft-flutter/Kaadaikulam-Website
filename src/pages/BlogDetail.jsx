import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, User, ArrowLeft, Clock, Share2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const q = query(
                    collection(db, 'blogs'), 
                    where('slug', '==', slug),
                    limit(1)
                );
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    setBlog({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                toast.error("Failed to load blog post");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
        window.scrollTo(0, 0);
    }, [slug]);

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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Post Not Found</h1>
                <p className="text-gray-500 mb-8">The article you are looking for might have been moved or deleted.</p>
                <Link 
                    to="/blog" 
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Hero Section with Featured Image */}
            <header className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-4 mb-6"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                                {blog.category}
                            </span>
                            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                <Calendar size={16} />
                                {formatDate(blog.publishDate || blog.createdAt)}
                            </div>
                            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                <User size={16} />
                                {blog.author || 'Admin'}
                            </div>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight"
                        >
                            {blog.title}
                        </motion.h1>
                    </div>
                </div>

                <div className="absolute top-8 left-8 md:top-12 md:left-12">
                    <Link 
                        to="/blog" 
                        className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary transition-all shadow-lg"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                </div>
            </header>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Intro / Short Description */}
                {blog.shortDescription && (
                    <p className="text-xl md:text-2xl text-gray-600 font-serif italic border-l-4 border-primary pl-8 mb-12 leading-relaxed">
                        {blog.shortDescription}
                    </p>
                )}

                {/* Main Content Rendered from HTML */}
                <div 
                    className="prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-3xl prose-a:text-primary prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Footer Section */}
                <footer className="mt-20 pt-12 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-3">
                            <Tag size={20} className="text-gray-400" />
                            <div className="flex flex-wrap gap-2">
                                {blog.tags?.split(',').map((tag, idx) => (
                                    <span key={idx} className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg font-medium">
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link copied to clipboard!");
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-primary transition-all shadow-lg"
                            >
                                <Share2 size={18} />
                                Share Story
                            </button>
                        </div>
                    </div>

                    {/* Author Box */}
                    <div className="mt-16 bg-gray-50 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-gray-100">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold text-4xl shadow-inner">
                            {blog.author?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Written by {blog.author || 'Admin'}</h4>
                            <p className="text-gray-500 leading-relaxed max-w-xl">
                                Dedicated to preserving and sharing the rich cultural and spiritual heritage of Poondurai Kaadai. 
                                Our mission is to keep the community connected through timeless stories and updates.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* More Posts Navigation */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Link 
                    to="/blog"
                    className="flex items-center justify-center gap-3 text-primary font-bold hover:gap-5 transition-all"
                >
                    Explore More Stories
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {/* Custom Styles for dangerouslySetInnerHTML content */}
            <style>{`
                .prose h1, .prose h2, .prose h3 { margin-top: 2.5rem; margin-bottom: 1.25rem; color: #111827; }
                .prose p { margin-bottom: 1.5rem; }
                .prose img { width: 100%; height: auto; margin: 3rem 0; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
                .prose ul, .prose ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                .prose li { margin-bottom: 0.5rem; }
                .prose blockquote p { font-size: 1.25rem; line-height: 1.6; color: #374151; font-style: italic; }
            `}</style>
        </article>
    );
};

export default BlogDetail;
